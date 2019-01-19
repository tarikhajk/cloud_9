var express = require("express");
var app = express();

// first route! (request checks go from top to bottom)
// "/" -> "Hi there!"
app.get("/", function(req, res) {
    res.send("Hi there!");
});

// "/bye" -> "Good bye!"
app.get("/bye", function(req, res) {
    res.send("Good bye!");
});

// "/cat" -> "meow!"
app.get("/ani/:animal", function(req, res) {
    var animal = req.params.animal;
    res.send("Welcome to the " + animal + " page!");
});

// go here if route not defined
// NEEDS to be the last route since it's a catchall
app.get("*", function(req, res) {
    res.send("we dont have a page for this :(");
});

// Tell Express to listen to requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started...");
}); // could be like port 3000 locally