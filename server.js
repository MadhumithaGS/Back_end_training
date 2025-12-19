// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());
// ================= CONFIG =================
const PORT = 3000;
const SECRET_KEY = "studentSecret123";

// ================= DATABASE CONNECTION =================
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= SCHEMA =================
const studentSchema = new mongoose.Schema({
  rollno: {
    type: Number,
    required: true,
    unique: true
  },
  studentName: {
    type: String,
    required: true
  },
  subjects: {
    subject1: {
      type: Number,
      required: true
    },
    subject2: {
      type: Number,
      required: true
    },
    subject3: {
      type: Number,
      required: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

// ================= MODEL =================
const Student = mongoose.model("Student", studentSchema);

// ================= JWT MIDDLEWARE =================
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { rollno, studentName, subjects, password } = req.body;

    const existingStudent = await Student.findOne({ rollno });
    if (existingStudent) {
      return res.status(400).json({ message: "Roll number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      rollno,
      studentName,
      subjects,
      password: hashedPassword
    });

    await student.save();
    res.status(201).json({ message: "Student registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { rollno, password } = req.body;

    const student = await Student.findOne({ rollno });
    if (!student)
      return res.status(401).json({ message: "Invalid roll number" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { rollno: student.rollno },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= PROTECTED ROUTE =================
app.get("/students", authMiddleware, async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// ================= GET PERSONS (PROTECTED) =================
app.get("/persons", authMiddleware, async (req, res) => {
  try {
    const persons = await Student.find();
    res.status(200).json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

