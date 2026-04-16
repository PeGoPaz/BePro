# BePro

A comprehensive platform for professional service management. This project is currently **under development**.

## 🚀 Overview

BePro is a full-stack web application designed to streamline bookings and service management between enterprises and users.

- **Frontend:** React with Vite & Tailwind CSS
- **Backend:** Node.js with Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT & Session-based

---

## 🏗️ Project Structure

```text
BePro/
├── backend/            # Express API, Models, Routes, and Middleware
└── frontend/           # Vite + React SPA with Tailwind CSS
```

---

## 🛠️ Getting Started (Development)

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- [Cloudinary Account](https://cloudinary.com/) (For image uploads)

### 1. Clone the repository
```bash
git clone <repository-url>
cd BePro
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend/` directory based on the configuration requirements (MongoDB URI, JWT Secret, Cloudinary credentials).
- Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
- The frontend will typically be available at `http://localhost:5173`.

---

## 📝 Features (Planned / In Progress)

- [ ] User Authentication (Sign up/Login)
- [ ] Enterprise Profiles & Service Listings
- [ ] Booking Management System
- [ ] Image Uploads via Cloudinary
- [ ] Responsive Dashboard for Users and Enterprises

---

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Tailwind CSS 4
- React Router 7
- Axios
- React Toastify

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Token (JWT)
- express-session
- Multer & Cloudinary (File Handling)

---

## 📄 License

This project is currently unlicensed / internal. (Adjust as needed)
