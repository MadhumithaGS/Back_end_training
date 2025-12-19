STUDENT API – BACKEND & FRONTEND PROJECT
======================================

This project is a simple Student Management system built using
Node.js, Express.js, MongoDB, and a basic HTML frontend.

It supports:
- Student Registration
- Student Login using JWT Authentication
- Fetching all registered students (protected route)

--------------------------------------------------
TECHNOLOGIES USED
--------------------------------------------------
Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- bcrypt (password hashing)
- CORS

Frontend:
- HTML
- JavaScript (Fetch API)

--------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------
student-api/
│
├── server.js                 -> Backend server
├── package.json              -> Node dependencies
│
├── frontend/
│   └── index.html            -> Frontend UI
│
└── README.txt                -> Project documentation

--------------------------------------------------
API ENDPOINTS
--------------------------------------------------

1) Register Student
-------------------
POST /register

Request Body (JSON):
{
  "rollno": 123,
  "studentName": "Madhu",
  "subjects": {
    "subject1": 45,
    "subject2": 55,
    "subject3": 65
  },
  "password": "password123"
}

Response:
{
  "message": "Student registered successfully"
}

--------------------------------------------------

2) Login Student
----------------
POST /login

Request Body:
{
  "rollno": 123,
  "password": "password123"
}

Response:
{
  "token": "JWT_TOKEN"
}

--------------------------------------------------

3) Get All Students (Protected)
-------------------------------
GET /persons

Headers:
Authorization: Bearer JWT_TOKEN

Response:
[
  {
    "_id": "...",
    "rollno": 123,
    "studentName": "Madhu",
    "subjects": {
      "subject1": 45,
      "subject2": 55,
      "subject3": 65
    }
  }
]

--------------------------------------------------
HOW TO RUN THE PROJECT
--------------------------------------------------

1) Install Node.js and MongoDB
2) Open terminal in project folder
3) Install dependencies:
   npm install

4) Start MongoDB service
5) Run server:
   node server.js

Server runs at:
http://localhost:3000

6) Open frontend:
Open frontend/index.html using Live Server
(or directly in browser)

--------------------------------------------------
IMPORTANT NOTES
--------------------------------------------------
- Backend runs on port 3000
- Frontend runs on port 5500 (Live Server)
- CORS is enabled in backend
- Passwords are securely hashed
- JWT is used for authentication

--------------------------------------------------
AUTHOR
--------------------------------------------------
Student Backend Training Project
Built for learning full-stack fundamentals

--------------------------------------------------
