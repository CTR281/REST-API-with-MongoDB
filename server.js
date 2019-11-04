//Create express app
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
var router=require('./routes/index');

// Server port
var HTTP_PORT = 3000;

//Start server
app.listen(HTTP_PORT, () =>
    {console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.use(router);

app.use((req,res) => {
    res.status(404);
});
