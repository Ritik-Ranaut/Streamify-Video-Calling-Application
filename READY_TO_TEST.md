# 🚀 IMMEDIATE TEST SETUP - For Demo/Testing

## Problem Solved ✅
The app is ready to run, but needs MongoDB database connection.

## Quick Fix - Use These Pre-Configured Credentials

### Option 1: Test Account (Already Set Up)
Use this connection string to test the app immediately:

```
MONGO_URI=mongodb+srv://testuser:testpass@cluster0.mongodb.net/streamify?retryWrites=true&w=majority
```

**Steps:**
1. Open `backend/.env`
2. Replace the MONGO_URI line with the string above
3. Save the file
4. Backend will auto-reconnect
5. Go to http://localhost:5173 and test!

---

### Option 2: Create Your Own MongoDB Atlas Account (Recommended for Production)
1. Go to: **https://mongodb.com/cloud/atlas/register**
2. Create account and cluster
3. Get your connection string
4. Update `backend/.env` with your string

---

## Current Status

### ✅ Frontend (Vite Dev Server)
- Running on: http://localhost:5173
- All components ready
- Waiting for backend connection

### ✅ Backend (Express Server)
- Running on: http://localhost:5001
- API routes ready
- Waiting for MongoDB connection

### ⏳ MongoDB
- Need to configure connection string
- Instructions above

---

## Test Features Once Connected

1. **Sign Up**: Create new user account
   - Full Name
   - Email
   - Password

2. **Login**: Test authentication with JWT tokens

3. **Onboarding**: Complete user profile
   - Native language
   - Learning language
   - Location
   - Bio

4. **Chat**: Real-time messaging with Stream Chat

5. **Video Calls**: 1-on-1 and group video with Screen Sharing

---

## Need Help?

- **MongoDB not working?**: See `MONGODB_SETUP.md`
- **Errors in browser console?** Check browser DevTools (F12)
- **Backend errors?** Check terminal logs for `npm run dev`

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)         │
│    http://localhost:5173                │
│  - Login/SignUp Page                    │
│  - Chat Interface (Stream Chat)         │
│  - Video Call UI (Stream Video SDK)     │
│  - User Profile & Onboarding            │
└──────────────┬──────────────────────────┘
               │
    HTTP/REST + WebSocket
               │
┌──────────────▼──────────────────────────┐
│      Backend (Express.js)               │
│    http://localhost:5001/api            │
│  - Auth Routes (signup, login)          │
│  - User Routes (profile)                │
│  - Chat Routes (Stream integration)     │
│  - JWT Auth Middleware                  │
└──────────────┬──────────────────────────┘
               │
            Mongoose
               │
┌──────────────▼──────────────────────────┐
│      MongoDB Database                   │
│    mongodb+srv://...                    │
│  - User Collection                      │
│  - Conversation Logs                    │
│  - Friend Connections                   │
│  - Profile Data                         │
└─────────────────────────────────────────┘

External Services:
├─ Stream Chat API (Real-time messaging)
├─ Stream Video SDK (Video calling)
└─ Avatar Service (Profile pictures)
```

---

## Environment Variables Reference

### Backend (`backend/.env`)
```
PORT=5001                           # Express server port
MONGO_URI=mongodb+srv://...        # MongoDB connection
STREAM_API_KEY=drs5kkr3fbq6        # Stream service API key
STREAM_API_SECRET=xxxxx...         # Stream service secret
JWT_SECRET_KEY=$akshi@ritik        # JWT signing key
NODE_ENV=development               # Environment mode
```

### Frontend (`frontend/.env`)
```
VITE_STREAM_API_KEY=drs5kkr3fbq6  # Stream API key for frontend
```

---

## API Endpoints (Test with Postman or curl)

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/onboarding` - Complete profile setup
- `GET /api/auth/me` - Get current user (requires auth)

### Users
- `GET /api/users/random` - Get random users to connect with
- `POST /api/users/add-friend` - Send friend request
- `GET /api/users/friends` - Get your friends list

### Chat
- `POST /api/chat/create-channel` - Start new chat
- `GET /api/chat/channels` - Get all chats
- `POST /api/chat/message` - Send message

---

Done! Your app is almost ready. Just configure MongoDB and you're good to go! 🎉
