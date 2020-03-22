// Dependencies
var path = require("path");

// Routing
// ========================================================
module.exports = function(app) {
    // HTML Requests

    // Basic route that send the user first to the AJAX Page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // Basic route to serve notes.html
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // serves the index.html file if the path does not exist e.g. http://localhost:8000/thispathdoesnotexist
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};