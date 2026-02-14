# Advorix-FullStack-Internship

This repository contains projects completed as part of my  
**Web Development (Full Stack) Internship at Advorix – February Batch 2026.**

## Intern Details
- **Name:** Meena Tharshini I  
- **Domain:** Web Development (Full Stack)
- **Organization:** Advorix
- **Duration:** February 2026

---

## 📌 Internship Requirements
As per Advorix guidelines, the following tasks were assigned:

## 🔹Compulsory Tasks
Build a complete CRUD Application
Create REST APIs (GET, POST, PUT, DELETE)
User Authentication (Login / Signup)

## 🔹Optional Task (Choose One)
Create a Multi-Page Application using React Router

---
## 🚀 Submitted Project
## 💼 Job Portal Website (Full Stack Application)
  This project is a fully functional Job Portal Web Application developed to satisfy all compulsory internship requirements.
  It demonstrates full integration of frontend and backend technologies along with proper database management and authentication system.
  
## 🚀 Features Implemented

## 1. Complete CRUD Application (Compulsory)

## Recruiter can:
     Create job postings
     View posted jobs
     Update job details
     Delete job postings
## Candidates can:
     View available jobs
     Apply for jobs
     
## 2. REST API Implementation (Compulsory)

Implemented RESTful endpoints:

GET     /api/jobs
GET     /api/jobs/:id
POST    /api/jobs
PUT     /api/jobs/:id
DELETE  /api/jobs/:id
All APIs follow proper REST architecture and are connected to the database.

## 3. User Authentication (Compulsory)
    User Signup
    User Login
    Protected dashboard routes
    Restricted access without authentication

## 4. Multi-Page Application
Implemented using:
    React
    React Router
    Pages include:
    Home
    Login
    Signup
    Recruiter Dashboard
    Edit Job
    View Jobs
    
## Tech Stack
## Frontend
    React
    React Router
    Custom CSS
    Backend
    Node.js
    Express.js
    MongoDB
    
## 📁 Project Structure

```
JobPortal
│
├── jobportal-backend
│   ├── controllers
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   ├── Application.js
│   │   ├── Job.js
│   │   └── User.js
│   ├── routes
│   │   ├── applicationRoutes.js
│   │   ├── jobRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── JOBPORTAL-FRONTEND
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   │   └── AuthContext.js
│   │   ├── pages
│   │   │   ├── Applications.js
│   │   │   ├── EditJob.js
│   │   │   ├── Jobs.js
│   │   │   ├── Landing.js
│   │   │   ├── Login.js
│   │   │   ├── PostJob.js
│   │   │   ├── RecruiterDashboard.js
│   │   │   └── Signup.js
│   │   ├── styles
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
└── .gitignore
│
└── README.md
```
