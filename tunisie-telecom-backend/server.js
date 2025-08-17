const express = require("express");
const errorHandler = require("./middleware/error");

const app = express();

// Routes
app.use("/api/baseStations", require("./routes/basestation"));
// ... other routes

// Error handling middleware (MUST be last)
app.use(errorHandler);