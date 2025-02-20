const mongoose = require("mongoose");

// "teamId": 301,

// 		"teamName": "Los Angeles Lakers",

// 		"city": "Los Angeles",

// 		"founded": "1947",

// 		"coach": "Darvin Ham"

const TeamSchema = new mongoose.Schema({
  teamId: {
    type: Number
  },
  teamName: {
    type: String
  },
  city: {
    type: String
  },
  founded: {
    type: String
  },
  coach: {
    type: String
  },
});

const Team = mongoose.model("Teams", TeamSchema);

module.exports = Team;