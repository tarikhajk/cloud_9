var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
})

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    // define a dictionary
    var sounds = {
        pig: "\'Oink\'",
        cow: "\'Moo\'",
        dog: "\'Woof Woof!\'"
    };

    res.send("The " + animal + " says " + sounds[animal]);
})

app.get("/repeat/:word/:num", function(req, res) {
    var word = req.params.word;
    var num = req.params.num;
    var string = "";
    for (var i = 0; i < num; i++) {
        string = string + word + " ";
    }
    res.send(string);
})

app.get("*", function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?");
})

//////////////////////////

// Tell Express to listen to requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Assignment1 server has started...");
}); // could be like port 3000 locally