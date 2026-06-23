# MongoDB Setup Guide for Streamify

## Quick Start - MongoDB Atlas (Recommended - 2 minutes)

### Step 1: Create Free MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email
3. Create an organization and project

### Step 2: Create a Database
1. Click "Build a Cluster" or "Create"
2. Select "Free" tier (M0 - free forever)
3. Select your region (closest to you)
4. Create cluster (takes ~5 minutes)

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password
5. Copy the credentials

### Step 4: Get Connection String
1. Go to "Database" → "Clusters"
2. Click "Connect" on your cluster
3. Choose "Drivers" → "Node.js"
4. Copy the connection string (format shown below)
5. Replace `<username>` and `<password>` with your credentials
6. Replace `<database>` with `streamify`

### Step 5: Update Backend .env
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/streamify?retryWrites=true&w=majority
```

### Step 6: Restart Backend
```
# The backend will auto-detect the change and reconnect
```

---

## Alternative: Local MongoDB Installation

### Option A: MongoDB Community Edition
1. Download: https://mongodb.com/try/download/community
2. Run installer and follow setup
3. Default connection string:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/streamify
   ```
4. Start MongoDB:
   ```
   mongod --dbpath "C:\data\db"
   ```

### Option B: Docker (if available)
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

---

## Verify Connection

Once MongoDB is running, you should see in backend logs:
```
✅ MongoDB Connected: localhost
```

Then you can:
1. Sign up a new user at: http://localhost:5173
2. Log in with your credentials
3. Complete onboarding
