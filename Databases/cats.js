var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true }); // itll make one for me if cat_app doesnt exist

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temper: String
})

var Cat = mongoose.model("Cat", catSchema);


// add a new cat to the database

// var bash = new Cat({
//     name: "Bash",
//     age: 4,
//     temper: "independant"
// })

// // we want to make sure the save completed properly, so we use a callback
// bash.save(function(err, cat) {
//     if (err) {
//         console.log("Oops, couldn't save cat to db...");
//     }
//     else {
//         console.log("Cat saved to db: " + cat);
//     }
// });

// this saves us the two steps
Cat.create({
    name: "Tank",
    age: 9,
    temper: "cuddly"
}, function(err, cat) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(cat);
    }
})

// retrieve all cats from db and console.log() each one
Cat.find({}, function(err, cats) {
    if (err) {
        console.log("Oh no!!! -> " + err);
    }
    else {
        console.log("All the cats -> \n" + cats);
    }
})
