var request = require("request");
request("https://jsonplaceholder.typicode.com/users/1", function(error, response, body) {
    // eval(require("locus")); to pause code and explore variables
    if (!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        console.log(parsedData.name + " lives in " + parsedData.address.city);
    } else {
        console.log("There was an error...");
    }
})