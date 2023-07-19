import mongoose from "mongoose";
import { log } from "../../utils";

/**
 * Connects to the MongoDB database using the MONGO_URI environment variable.
 * @returns Promise<void>
 */
export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    log.info("DB connected.");
    return;
  } catch (err: any) {
    throw new Error(`DB connection failed: ${err?.message}`);
  }
};
