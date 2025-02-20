import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Team from "../model/Team";

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

// Inserting data into the database
const insertTeams = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../teams.json");
    const teams = JSON.parse(fs.readFileSync(filePath, "utf8"));
    await connectDb();
    const insertedTeams = await Team.find({});
    if (insertedTeams.length > 0) {
      res.status(200).json({
        message: "Teams already inserted"
      })
      return;
    }
    await Team.insertMany(teams);
    res.status(201).json({
      message: "Teams inserted successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error inserting teams"
    })
  }
}

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    await connectDb();
    const teams = await Team.find({});
    res.status(200).json({
      message: "Teams fetched successfully",
      teams
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching teams"
    })
  }
}
