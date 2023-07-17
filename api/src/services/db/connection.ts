import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the MONGO_URI environment variable.
 * @returns Promise<void>
 */
export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
    return;
  } catch (err) {
    console.error("DB connection failed");
    throw err;
  }
};
