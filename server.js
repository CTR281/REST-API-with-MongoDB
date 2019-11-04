//Create express app
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 3000;

//Start server
app.listen(HTTP_PORT, () =>
    {console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get('/', (req,res) => {
    res.send("Ok");
});

app.use((req,res) => {
    res.status(404);
});
