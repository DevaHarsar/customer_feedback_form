# Customer Feedback Form

A full-stack web application for collecting and managing customer feedback for a clothing store. Built with React (frontend), Node.js/Express (backend), and MySQL (database).

---

## Table of Contents
- [Features](#features)
- [Tech Stack & Packages](#tech-stack--packages)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Screenshots](#screenshots)

---

## Features
- Multi-step customer feedback form
- Signature capture and preview
- Admin dashboard to view all feedbacks
- Responsive, modern UI with Material-UI
- Error handling for API/database issues

---

## Tech Stack & Packages

### Frontend
- **React** (with hooks)
- **Redux Toolkit** (state management)
- **Material-UI (MUI)** (UI components)
- **Axios** (HTTP requests)
- **react-signature-canvas** (signature capture)
- **Vite** (build tool)

#### Main Frontend Packages
```
@mui/material
@mui/icons-material
@emotion/react
@emotion/styled
@reduxjs/toolkit
react-redux
axios
react-signature-canvas
vite
```

### Backend
- **Node.js**
- **Express**
- **MySQL** (database)
- **mysql2** (MySQL client)

#### Main Backend Packages
```
express
mysql2
```

---

## Project Structure
```
customer_feedback_form/
├── backend/
│   ├── db.js                 # Database connection
│   ├── server.js             # Express server setup
│   ├── models/
│   │   └── feedback.js       # Database operations
│   ├── routes/
│   │   └── feedback.js       # API endpoints
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── main.jsx          # React entry point
│   │   ├── features/
│   │   │   └── feedbackSlice.js  # Redux slice
│   │   ├── store/
│   │   │   └── index.js      # Redux store
│   │   ├── steps/
│   │   │   ├── CustomerInfoStep.jsx
│   │   │   ├── ProductFeedbackStep.jsx
│   │   │   ├── RatingStep.jsx
│   │   │   ├── SignatureStep.jsx
│   │   │   └── SuccessStep.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md

---

## Setup Instructions

### Backend Setup
1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Configure MySQL:**
   - Create a MySQL database (e.g., `feedback_db`).
   - Update `db.js` with your MySQL credentials.
   - Create the `feedbacks` table:
     ```sql
     CREATE TABLE feedbacks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       full_name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       phone VARCHAR(20) NOT NULL,
       purchase_date DATE NOT NULL,
       products TEXT NOT NULL,
       feedback TEXT,
       rating_quality INT NOT NULL,
       rating_staff INT NOT NULL,
       rating_experience INT NOT NULL,
       signature LONGTEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     );
     ```
3. **Start the backend server:**
   ```sh
   node server.js
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000)

### Frontend Setup
1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Usage
- Open the frontend in your browser.
- Fill out the feedback form as a customer.
- Admins can view all feedbacks in the Admin View tab.
- Signature is captured and displayed as an image.
- All data is stored in the MySQL database.

---



###ScreenShots
![Screenshot 2025-06-26 172438](https://github.com/user-attachments/assets/b82d3f65-94db-4d9e-9947-1432c9385217)
![Screenshot 2025-06-26 172449](https://github.com/user-attachments/assets/71f1259a-e820-4692-bec5-4e14a07f1a62)
![Screenshot 2025-06-26 172525](https://github.com/user-attachments/assets/db0e961d-fbb4-4343-91fb-247333bd73ee)
![Screenshot 2025-06-26 172545](https://github.com/user-attachments/assets/6cf2429e-bb8e-415b-8117-a57cae834d9a)
![Screenshot 2025-06-26 172637](https://github.com/user-attachments/assets/59c07f71-3ed2-4c81-a799-b97ca8fb3c47)
![Screenshot 2025-06-26 185230](https://github.com/user-attachments/assets/5c2f9ace-918c-4d34-9dab-f136203b1dfb)

###Responsive design
![Screenshot 2025-06-26 190454](https://github.com/user-attachments/assets/455969ec-16cc-4946-9209-5a4ebd6d17e6)
![Screenshot 2025-06-26 190653](https://github.com/user-attachments/assets/2348cbe8-8034-4336-9a67-1b3bfb7a3ae3)
![Screenshot 2025-06-26 190620](https://github.com/user-attachments/assets/b24382de-fb1e-4071-99a8-7d26fdec85e8)
![Screenshot 2025-06-26 190545](https://github.com/user-attachments/assets/83ab7dca-e9c2-41e3-8e33-5d7abf04354a)
![Screenshot 2025-06-26 190525](https://github.com/user-attachments/assets/f2787fb9-03a1-4aab-ba4c-4d0148518210)



