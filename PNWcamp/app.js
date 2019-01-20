var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//var request = require("request");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// this will be migrated into MongoDB
var campgrounds = [
    { name: "Camp Sherman Campground", image: "https://www.active.com/Assets/Outdoors/camp-sherman.jpg" },
    { name: "Diamond Lake", image: "https://www.active.com/Assets/Outdoors/diamond-lake.jpg" },
    { name: "Paradise Creek Campground", image: "https://www.active.com/Assets/Outdoors/paradise-creek.jpg" },
    { name: "Camp Sherman Campground", image: "https://www.active.com/Assets/Outdoors/camp-sherman.jpg" },
    { name: "Diamond Lake", image: "https://www.active.com/Assets/Outdoors/diamond-lake.jpg" },
    { name: "Camp Sherman Campground", image: "https://www.active.com/Assets/Outdoors/camp-sherman.jpg" },
    { name: "Diamond Lake", image: "https://www.active.com/Assets/Outdoors/diamond-lake.jpg" },
    { name: "Camp Sherman Campground", image: "https://www.active.com/Assets/Outdoors/camp-sherman.jpg" },
    { name: "Diamond Lake", image: "https://www.active.com/Assets/Outdoors/diamond-lake.jpg" },
    { name: "Camp Sherman Campground", image: "https://www.active.com/Assets/Outdoors/camp-sherman.jpg" },
    { name: "Diamond Lake", image: "https://www.active.com/Assets/Outdoors/diamond-lake.jpg" }
]

app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
})

// follow REST convention by making POST and GET route have the same URL
app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({ name: name, image: image });
    res.redirect("/campgrounds"); // default is to redirect as a GET request
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new")
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server is listenting!");
});
