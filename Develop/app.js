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

// Routes
// ==================================================================

// Basic route that send the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

// Basic route to serve notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get("/api/notes", function(req,res) {
    const dataPath = path.join(__dirname, "/db/db.json")
    var content = [];

    fs.readFile(dataPath, function(err, data) {
        if (err) {
            console.log("something went wrong");
        }

        content = data.toString();
        var jsonObj = JSON.parse(content)
        // console.log("console: " + content);
        res.json(jsonObj);
    });
});

// serves the index.html file if the path does not exist e.g. http://localhost:8000/thispathdoesnotexist
app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening at http://localhost:" + PORT);
})