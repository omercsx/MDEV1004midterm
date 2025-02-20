const express = require('express');
const cors = require('cors');
const teamsRoutes = require("./src/routes/teamsRoutes");
const { insertTeams } = require("./src/controller/teamsController");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/teams", teamsRoutes)

// Push teams to the database
insertTeams();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
