import mongoose from "mongoose";

export const connectDB = async () => {
  const maxRetries = 3;
  let retries = 0;

  const attemptConnection = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 2,
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return true;
    } catch (error) {
      retries++;
      console.log(`❌ MongoDB Connection Attempt ${retries}/${maxRetries} failed`);
      console.log(`📍 Trying to connect to: ${process.env.MONGO_URI}`);
      console.log(`⚠️  Error: ${error.message}`);

      if (retries < maxRetries) {
        console.log(`🔄 Retrying in 3 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return attemptConnection();
      }

      console.log("\n🚨 MongoDB Setup Required:");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Option 1: Use MongoDB Atlas (Cloud - Recommended)");
      console.log("  1. Go to: https://mongodb.com/cloud/atlas");
      console.log("  2. Create free account & database");
      console.log("  3. Get connection string");
      console.log("  4. Update MONGO_URI in .env");
      console.log("");
      console.log("Option 2: Install MongoDB Community Edition locally");
      console.log("  1. Download from: https://mongodb.com/try/download");
      console.log("  2. Run: mongod --dbpath C:\\data\\db");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

      return false;
    }
  };

  const isConnected = await attemptConnection();
  if (!isConnected) {
    console.log("❌ Failed to connect to MongoDB. Check the setup instructions above.");
    throw new Error("Unable to connect to MongoDB");
  }
};
