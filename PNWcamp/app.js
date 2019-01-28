var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/pnw_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//         name: "Diamond Lake",
//         image: "https://www.active.com/Assets/Outdoors/diamond-lake.jpg"
//     },
//     function(err, camp) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("NEW CAMP -> " + camp)
//         }
//     });

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, all_camps) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds", { campgrounds: all_camps });
        }
    })

});

// follow REST convention by making POST and GET route have the same URL
app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    //campgrounds.push({ name: name, image: image });
    Campground.create({
            name: name,
            image: image
        },
        function(err, new_camp) {
            if (err) {
                console.log(err);
            }
            else {
                //console.log("NEW CAMP -> " + new_camp)
                res.redirect("/campgrounds"); // default is to redirect as a GET request
            }
        });

})

app.get("/campgrounds/new", function(req, res) {
    res.render("new")
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server is listenting!");
});
