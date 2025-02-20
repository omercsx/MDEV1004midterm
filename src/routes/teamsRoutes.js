const express = require("express");
const router = express.Router();

// controllers import
const { insertTeams, getAllTeams, getTeamById, getTeamsByCity } = require("../controller/teamsController");

// routes 
router.post("/insert", insertTeams);
router.get("/", getAllTeams);
router.get("/:id", getTeamById);
router.get("/city/:city", getTeamsByCity);

module.exports = router;