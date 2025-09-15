import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
  const mongoUri = ENV.MONGO_URI;
  
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log("MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB:", error);
    process.exit(1);
  }
};
