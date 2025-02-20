import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// For database connection 
export const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://user3:user3@cluster0.wljfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}