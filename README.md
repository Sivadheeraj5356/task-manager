# Task Management App

## Overview
This is a full-stack **Task Management Web Application** that allows users to **create, edit, delete, and mark tasks as completed**. The application is built using **Next.js** for the frontend and **Node.js (API route handlers) with Prisma and PostgreSQL** for the backend.

## Tech Stack
- **Frontend:** Next.js (React)
- **Backend:** Next.js API Routes (Node.js + Express-like handling)
- **Database:** PostgreSQL (via Prisma ORM)
- **Styling:** Tailwind CSS (Optional, can be replaced)
- **Deployment:** Vercel / Railway / Render

## Features
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Mark Tasks as Completed**
- **Persistent Storage**: PostgreSQL for data storage
- **RESTful API**: Built using Next.js API Routes
- **Error Handling**: Handles validation failures, missing resources, and incorrect requests

---

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### 2. Install Dependencies
```sh
yarn install  # or npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/task_management
```
Replace `user`, `password`, and `task_management` with your actual PostgreSQL credentials.

### 4. Setup Database with Prisma
Run the following commands to initialize Prisma and create the database schema:
```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the Development Server
```sh
yarn dev  # or npm run dev
```

The application should now be running at `http://localhost:3000`

---

## API Documentation

### **1. Get All Tasks**
**Endpoint:** `GET /api/tasks`
```sh
curl -X GET http://localhost:3000/api/tasks
```
#### Response:
```json
[
  { "id": 1, "title": "Sample Task", "description": "Task details", "completed": false }
]
```

### **2. Create a New Task**
**Endpoint:** `POST /api/tasks`
```sh
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{ "title": "New Task", "description": "Details" }'
```
#### Response:
```json
{ "id": 2, "title": "New Task", "description": "Details", "completed": false }
```

### **3. Update a Task**
**Endpoint:** `PUT /api/tasks/:id`
```sh
curl -X PUT http://localhost:3000/api/tasks/1 -H "Content-Type: application/json" -d '{ "completed": true }'
```
#### Response:
```json
{ "id": 1, "title": "Sample Task", "description": "Task details", "completed": true }
```

### **4. Delete a Task**
**Endpoint:** `DELETE /api/tasks/:id`
```sh
curl -X DELETE http://localhost:3000/api/tasks/1
```
#### Response:
```json
{ "message": "Task deleted successfully" }
```

---

## Testing the API
- Use **Postman** or **curl** to test API endpoints.
- Ensure the database is running and migrations are applied.
- For debugging, check logs in the terminal (`console.log` statements).

---

## UI Screenshots
![Home Page](./screenshots/home.png)
![Task List](./screenshots/tasks.png)

---

## Deployment
1. **Host the PostgreSQL Database** on **Neon**.
2. Deploy the Next.js app on **Vercel**.
3. Set the correct **DATABASE_URL** in the production environment.

---



## Author
Developed by **Siva Dheeraj** 🚀
