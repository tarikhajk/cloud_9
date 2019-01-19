var express = require("express");
var app = express();

// makes the server also show any .css or other files in the 'public' folder
app.use(express.static("public")); 

// this allows us to skip the '.ejs' suffix on file types
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home")
});

app.get("/inlovewith/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love", {thingVAR: thing});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is listenting!");
});