var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// need this line to parse form posts
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["Tony", "Lilly", "Michael", "Jimmy"];

app.get("/", function(req, res) {
    res.render("home");
})

// push new name into global friends array and redirect to friends page
app.post("/addfriend", function(req,res) {
    var name = req.body.newfriend
    friends.push(name);
    res.redirect("/friends");
})

// pass in friends array
app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started...");
})