// DEPENDENCIES
const path = require("path");
const fs = require("fs");

module.exports = function(app) {
    
    // Route to read database
    app.get("/api/notes", function(req,res) {
        // set Path to the database 
        const dataPath = path.join(__dirname, "../db/db.json")

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
        const dataPath = path.join(__dirname, "../db/db.json")
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
        const dataPath = path.join(__dirname, "../db/db.json")
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
}