// Dependencies
// ==========================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the express app
// ==========================================================
const app = express();
const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Serve static files
app.use(express.static('public'))

// ===================================================================
// ROUTER
// ====================================================================
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening at http://localhost:" + PORT);
})