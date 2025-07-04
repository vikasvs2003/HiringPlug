# 🚀 HiringPlug – Modern Job Portal Web App

HiringPlug is a full-stack job portal built with a modern, clean UI and real-time recruiter-candidate interaction. It empowers job seekers to explore, apply, and track job applications while enabling recruiters to manage job postings efficiently.

---

## 🌐 Live Demo

[🔗 View Live Website ](https://hiringplug.onrender.com/)

---

---


## 📌 Features

### 👨‍💼 Job Seeker
- 🌐 Browse & search jobs by category, type, or location
- 📝 Apply for jobs with uploaded resumes
- 📁 Edit and manage profile (bio, skills, resume)
- 📄 View application history

### 🧑‍💼 Recruiter
- 🧾 Post new job listings
- 📊 Manage applications and applicants
- 🧑‍💻 View job details and applicant profiles

### 💡 Additional
- 🔍 Smart Filters (Location, Industry, Job Type)
- 🔁 Live search using Redux
- ✨ Attractive UI with animated carousels and badges

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ React.js (with Tailwind CSS + Shadcn/ui)
- 🔄 Redux Toolkit
- 🧭 React Router DOM
- 🎨 Lucide Icons

### Backend:
- 🟨 Node.js + Express.js
- 📦 MongoDB with Mongoose
- 🛡️ JWT Authentication
- 📁 Multer for File Uploads
- ☁️ Cloudinary for Resume/Image Hosting


## 🔧 Installation & Setup

### Prerequisites
- Node.js & npm
- MongoDB (local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hiringplug-jobportal.git
cd hiringplug-jobportal

```
### 2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file in /backend and add:
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```
Then run:
```
npm run dev

```
### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev

````
Visit: http://localhost:5173 or http://localhost:3000
### 4 .Folder Structure
```bash
hiringplug-jobportal/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── utils/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── pages/
│   │   └── assets/

```
### 5. Acknowledgements
Special thanks to:

OpenAI & ChatGPT for support in design logic

Shadcn UI & Tailwind for helping achieve a clean UX











