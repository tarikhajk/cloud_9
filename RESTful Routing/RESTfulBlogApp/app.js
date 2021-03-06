var express = require("express"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);


// RESTFUL ROUTES (ALL 7)

app.get("/", function(req, res) {
    res.redirect("/blogs");
})

// INDEX ROUTE
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log("Error!!!");
        }
        else {
            res.render("index", { blogs: blogs });
        }
    })
    //res.render("index");
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
    // create blog
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render("new");
        }
        else {
            res.redirect("blogs");
        }
    })
})

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.render("show", { blog: foundBlog });
        }
    })
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blogToEdit) {
        if (err) {
            res.redirect("/blogs/:id");
        }
        else {
            res.render("edit", { blog: blogToEdit });
        }
    })
})

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

// DESTROY ROUTE
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            alert("could not delete blog...");
        }
        res.redirect("/blogs");
    })
})

// SERVER
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Blog_app server is listenting!");
});
