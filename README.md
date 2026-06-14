# MindVault

MindVault is a secure full-stack Notes Taaking Application built to streamline digital thought organization featuring user authentication via Google OAuth 2.0. This project is made to enhance my learning in web dev.

## 🚀 Live Demo
* **Production Application Link:** [https://mindvault-0kwn.onrender.com](https://mindvault-0kwn.onrender.com)

---

## ✨ Features
* **Secure Authentication:** Single Sign-On (SSO) engine using Passport.js and Google OAuth 2.0.
* **Full CRUD Functionality:** Create, view, edit, and delete notes dynamically.
* **Server-Side Security:** API throttling and protection utilizing Upstash Redis as a high-speed rate limiter.
* **Dynamic Routing:** Protected client-side and server-side routes ensuring only authenticated users modify data.
* **Responsive UI:** Modern, responsive dark/light elements styled using Tailwind CSS.

---

## 📂 Folder Structure : 
```
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   └── google.js
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── upstash.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── notes.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── rateLimiter.js
│   │   ├── models/
│   │   │   ├── Note.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── notesRoutes.js
│   │   └── server.js
│   ├── package-lock.json
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── not_found.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   └── RateLimitedUI.jsx
│   │   ├── lib/
│   │   │   ├── axios.js
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── CreatePage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── NoteDetail.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── package.json
```

---

## 🛠 Tech Stack

* **Frontend:** React , Tailwind CSS, Axios
* **Backend:** Node.js, Express.js, Passport.js (Google OAuth 2.0 Strategy)
* **Database:** MongoDB (via Mongoose ODM)
* **Caching & Sessions:** Redis (via Upstash Redis)
* **Hosting/Deployment:** Render

---

## 🔑 Environment Variables Setup

To run this project locally or deploy it to a cloud provider, create a `.env` file in your root backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
SESSION_SECRET=your_jwt_or_session_secret_here

# Client URLs (Change based on environment)
# Local Development: http://localhost:5173
# Production: Your live frontend domain link
CLIENT_URL=http://localhost:5173 
CALLBACK_URL=http://localhost:5000/auth/google/callback

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Database Configurations
MONGO_URL=your_mongodb_connection_string_here

# Redis Cache Configurations (Upstash)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here
```

---

### 💻 Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ashutoshmore24/MindVault
   
   cd mindvault
   ```

2. **Set up the Backend Server:**
   ```bash
   cd backend
   npm install
   # Create your .env file here and add your credentials
   npm start
   ```

3. **Set up the Frontend Application:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.
---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).


Made with ❤️ by [Ashutosh More](https://github.com/Ashutoshmore24)   |   Thank You !!
---

