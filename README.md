# Social Media Platform Backend

A RESTful backend API for a social media platform built with the MERN stack. This project provides user authentication, post management, likes, comments, follow/unfollow functionality, and profile image uploads using ImageKit.

## 🚀 Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT Authentication
* Password Hashing with bcryptjs
* Protected Routes

### User Management

* Get User Profile
* Update User Profile
* Upload Profile Picture
* Follow Users
* Unfollow Users
* Followers & Following Count

### Posts

* Create Post
* Get All Posts
* Get Single Post
* Delete Own Post

### Engagement

* Like Post
* Unlike Post
* Add Comment
* View Comments

### Media Upload

* Profile Image Upload with Multer
* Cloud Storage using ImageKit

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JWT (JSON Web Token)
* bcryptjs
* cookie-parser

### File Upload

* Multer
* ImageKit

### Utilities

* dotenv
* cors

---

## 📂 Project Structure

```text
backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── app.js
│
├── .env
├── server.js
├── package.json

```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |
| POST   | /api/auth/logout   | Logout User   |

### Users

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | /api/users/profile/      | Get User Profile       |
| PUT    | /api/users/profile       | Update Profile         |
| POST   | /api/users/upload-avatar | Upload Profile Picture |
| POST   | /api/users/follow/       | Follow User            |
| POST   | /api/users/unfollow/     | Unfollow User          |

### Posts

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| POST   | /api/posts  | Create Post     |
| GET    | /api/posts  | Get All Posts   |
| GET    | /api/posts/ | Get Single Post |
| DELETE | /api/posts/ | Delete Post     |

### Likes & Comments

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/posts//like    | Like/Unlike Post |
| POST   | /api/posts//comment | Add Comment      |

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```env

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/pratikmaity017-hash/social-media-project.git
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

## 🔒 Authentication Flow

1. User registers an account.
2. Password is hashed using bcryptjs.
3. User logs in.
4. Server generates a JWT token.
5. Token is stored in HTTP-only cookies.
6. Protected routes verify JWT using middleware.

---

## 📈 Future Improvements

* Notifications System
* Real-Time Chat with Socket.IO
* Feed Algorithm
* Search Users
* Saved Posts
* Reels / Video Upload
* Admin Dashboard

---

## 👨‍💻 Author

Pratik Maity

Built as a learning project to practice:

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* REST API Development
* File Uploads
* Backend Architecture
