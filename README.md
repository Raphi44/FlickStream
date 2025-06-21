# Movies & Subscriptions Management System

A full-stack web application for managing movies, subscriptions, and user permissions.

## 🚨 Security Setup (IMPORTANT)

Before running this project, you must set up your environment variables to protect sensitive data.

### Backend Setup

1. **Copy the environment template:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit `backend/.env` with your actual values:**
   ```bash
   # Server Ports
   PORT_CIN=4001
   PORT_SUBS=4000
   
   # MongoDB Connection Strings (REPLACE WITH YOUR ACTUAL VALUES)
   MONGO_URL_USERS=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/UsersDB
   MONGO_URL_SUBS=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/SubscriptionsDB
   
   # JWT Secret Key (GENERATE A NEW ONE)
   TOKEN_KEY=your-secret-jwt-key-here
   ```

3. **Generate a secure JWT key:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Frontend Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your API URLs:**
   ```bash
   REACT_APP_SUBSCRIPTION_API_URL=http://localhost:4000
   REACT_APP_CINEMA_API_URL=http://localhost:4001
   ```

## 🚫 Files NOT to Upload to GitHub

The following files contain sensitive information and are automatically ignored:

- `backend/.env` - Contains database credentials and JWT secrets
- `backend/CinemaWS/files/Users.json` - User data (should be in database)
- `backend/CinemaWS/files/Permissions.json` - Permission data (should be in database)
- `.env` - Frontend environment variables
- `node_modules/` - Dependencies
- `.DS_Store` - macOS system files

## 🏗️ Project Structure

```
my-app/
├── src/                    # React frontend
│   ├── Pages/             # Page components
│   ├── redux/             # State management
│   └── ...
├── backend/               # Node.js backend
│   ├── CinemaWS/         # User management service (port 4001)
│   ├── SubscriptionWS/   # Movies/Subscriptions service (port 4000)
│   └── .env              # Environment variables (NOT in git)
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd my-app
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend/CinemaWS
   npm install
   
   cd ../SubscriptionWS
   npm install
   ```

4. **Set up environment variables** (see Security Setup above)

5. **Start the backend services:**
   ```bash
   # Terminal 1 - CinemaWS (User Management)
   cd backend/CinemaWS
   npm start
   
   # Terminal 2 - SubscriptionWS (Movies/Subscriptions)
   cd backend/SubscriptionWS
   npm start
   ```

6. **Start the frontend:**
   ```bash
   # Terminal 3
   npm start
   ```

7. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Environment variable protection
- CORS configuration

## 📝 Available Scripts

### Frontend
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

### Backend
- `npm start` - Starts the server
- `npm run dev` - Starts the server with nodemon (if configured)

## 🛠️ Technologies Used

### Frontend
- React.js
- Redux Toolkit
- Axios
- React Router
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## 📄 License

This project is private and confidential.
