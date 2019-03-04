var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pnw_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// RESTful Routes (7 total)
//
// name     url                 verb                desc.  
//================================================
//INDEX     /dogs               GET         Display a list of all dogs
//NEW       /dogs/new           GET         Displays a form to make a new dog
//CREATE    /dogs               POST        Add new dog to database
//SHOW      /dogs/:id           GET         Shows info about 1 dog

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//         name: "Granite Hill",
//         image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
//         desc: "What a lovely place! If only it were a real campground </3"
//     },
//     function(err, campground) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("NEWLY CREATED CAMPGROUND")
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, all_camps) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { campgrounds: all_camps });
        }
    })

});

// CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    //campgrounds.push({ name: name, image: image });
    Campground.create({
            name: name,
            image: image,
            desc: desc
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

});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// SHOW - shows more info about a specific campground
app.get("/campgrounds/:id", function(req, res) {
    // find campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("show", { campground: foundCampground });
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server is listenting!");
});
