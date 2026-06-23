# ⚡ QUICK START - Get Streamify Running in 5 Minutes

## What's the Issue?
The app needs **MongoDB** to store users, chats, and video call data. MongoDB is not installed locally, so you need to use a cloud database.

## ✅ Solution: MongoDB Atlas (Free, Takes 3 Minutes)

### Step 1️⃣: Create Account (1 minute)
1. Go to: **https://mongodb.com/cloud/atlas/register**
2. Click **Sign Up with Email**
3. Enter your email and create a password
4. Click verify email link (check your inbox)

### Step 2️⃣: Create Free Database (1 minute)
1. After login, click **"Create"** or **"Build a Cluster"**
2. Select **"Free (M0)"** tier (free forever!)
3. Choose your region closest to you
4. Click **"Create Cluster"**
   - ⏳ Wait 3-5 minutes for cluster to be created

### Step 3️⃣: Create Database User (30 seconds)
1. While cluster is creating, go to **"Database Access"** (left sidebar)
2. Click **"+ Add New Database User"**
3. Username: `streamify_user`
4. Password: create a strong one (copy it!)
5. Click **"Add User"**

### Step 4️⃣: Get Connection String (30 seconds)
1. Go to **"Database"** → **"Clusters"**
2. Click **"Connect"** button on your cluster
3. Select **"Drivers"**
4. Choose **"Node.js"** and **"Latest"**
5. **Copy the connection string** (it looks like):
   ```
   mongodb+srv://streamify_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5️⃣: Update Your .env File (1 minute)
1. Open file: `backend/.env`
2. Replace this line:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/streamify
   ```
   With your copied connection string:
   ```
   MONGO_URI=mongodb+srv://streamify_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/streamify?retryWrites=true&w=majority
   ```
3. **Important:** Replace `YOUR_PASSWORD` with your actual password (from Step 3)
4. Change `<database>` to `streamify` if not already done
5. Save the file (Ctrl+S)

### Step 6️⃣: Restart Backend
The backend will auto-detect the changes! You should see in the terminal:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

---

## 🎉 Now You Can:
1. ✅ Open **http://localhost:5173**
2. ✅ Click **"Sign Up"**
3. ✅ Create a new account
4. ✅ Log in with your credentials
5. ✅ Complete onboarding
6. ✅ Chat and video call with friends!

---

## ❓ Troubleshooting

### "Authentication failed for user"
- Check your password is exactly correct in the MONGO_URI
- Make sure you didn't include `<>` brackets

### "Timeout connecting to cluster"
- Your IP needs to be whitelisted
- Go to "Database Access" → "Network Access"
- Click "+ Add IP Address" → "Allow Access from Anywhere"

### Still not working?
- Make sure you're using the entire connection string from MongoDB
- Double-check spelling of username and password
- Verify cluster has finished creating (5-10 minutes)

---

## 📚 Full Documentation
See `MONGODB_SETUP.md` in the project root for detailed alternatives and troubleshooting.
