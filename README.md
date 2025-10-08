## Getting Started

### 1. Setup environment variables

```bash
cd backend touch .env
```
Then fill in the values according to your database, auth, and service configuration. Example:
```
PORT=3000
NODE_ENV=development

# Database (MongoDB Atlas)
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.mongodb.net/YOUR_DB_NAME?retryWrites=true&w=majority

# JWT Auth
JWT_SECRET=your_jwt_secret_here

# Resend Email Service
RESEND_API_KEY=your_resend_api_key_here
CLIENT_URL=http://localhost:5173
EMAIL_FROM="your_email@example.com"
EMAIL_FROM_NAME="Your Name"

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_api_key
CLOUDINARY_API_SECRET=your_cloud_api_secret

# Arcjet
ARCJET_KEY=your_arcjet_key_here
ARCJET_ENV=development
```

### 2. run the development 

#### Backend
```bash
cd backend
npm install
npm run dev
```
#### Frontend
```bash
cd frontend
npm install
npm run dev
```

You can now open your browser to see the application running:
Backend: http://localhost:3000
Frontend: http://localhost:5173

## Live Demo

Project is deployed on Sevalla:  
👉 [https://webchat-realtime-n8354.sevalla.app](https://webchat-realtime-n8354.sevalla.app)
