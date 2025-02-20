const express = require("express");
const router = express.Router();

// controllers import
const { insertTeams, getAllTeams, getTeamById, getTeamsByCity } = require("../controller/teamsController");

// routes 
router.post("/teams/insert", insertTeams);
router.get("/teams", getAllTeams);
router.get("/teams/:id", getTeamById);
router.get("/teams/city/:city", getTeamsByCity);

module.exports = router;