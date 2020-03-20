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

// Route to read database
app.get("/api/notes", function(req,res) {
    // set Path to the database 
    const dataPath = path.join(__dirname, "/db/db.json")

    // read the data base file @ dataPath 
    fs.readFile(dataPath, function(err, data) {
        if (err) {
            console.log("something went wrong");
        }
        res.json(JSON.parse(data));
    });
});

// route to add notes to data base
app.post("/api/notes", function(req, res) {
    // set Path to the database 
    const dataPath = path.join(__dirname, "/db/db.json")
    // JSON stringify request body and setting to variable
    const newNote = req.body;
    // give each note an id property
    newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();

    // Read Database 
    const oldDataBase = () => fs.readFileSync(dataPath, {encoding: 'utf8'});
    // create JSON object of the response from the Database.
    const jsonOldDB = JSON.parse(oldDataBase());

    // Add new note to the database
    jsonOldDB.push(newNote);
    let newDB = jsonOldDB;

    const newDataBase = () => fs.writeFileSync(dataPath, JSON.stringify(newDB, null, 2), {encoding: 'utf8'});
    newDataBase();
    // respond with new data
    res.json(newNote);
})

app.delete("/api/notes/:note", function(req, res) {
    // set Path to the database 
    const dataPath = path.join(__dirname, "/db/db.json")
    var deleteNote = req.params.note;
    console.log("Note Deleted: " + deleteNote);

    // read database
    const oldDataBase = () => fs.readFileSync(dataPath, {encoding: 'utf8'});
    const jsonDB= JSON.parse(oldDataBase());
    // console.log(jsonDB);

    for (var i = 0; i < jsonDB.length; i++) {
        if (deleteNote === jsonDB[i].id) {
            jsonDB.splice([i], 1,);
            fs.writeFileSync(dataPath, JSON.stringify(jsonDB, null, 2), {encoding: 'utf8'});
            return res.json(jsonDB);
        }
    };

})



// serves the index.html file if the path does not exist e.g. http://localhost:8000/thispathdoesnotexist
app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening at http://localhost:" + PORT);
})