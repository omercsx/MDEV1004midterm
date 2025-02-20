const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Team = require("../model/Team");

// For database connection 
const connectDb = async () => {
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

// Get a team by id
const getTeamById = async (req, res) => {
  try {
    await connectDb();
    const team = await Team.findOne({ teamId: req.params.id });
    if (!team) {
      return res.status(404).json({
        message: "Team not found"
      });
    }
    res.status(200).json(team);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching team"
    });
  }
};

// Get teams by city
const getTeamsByCity = async (req, res) => {
  try {
    await connectDb();
    const teams = await Team.find({ city: req.params.city });
    if (teams.length === 0) {
      return res.status(404).json({
        message: "No teams found in this city"
      });
    }
    res.status(200).json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching teams"
    });
  }
};

module.exports = { insertTeams, getAllTeams, getTeamById, getTeamsByCity, connectDb };