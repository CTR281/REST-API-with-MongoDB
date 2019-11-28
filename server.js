//Create express app
const config = require('config');
const express = require("express");
const app = express();

//To enable req.body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
const apiRouter=require('./routes/rpg');

// Server port
const HTTP_PORT = config.get("server.port");

//Start server
app.listen(HTTP_PORT, () =>
    {console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.use('/rpg', apiRouter);

app.use((req,res) => {
    res.status(404);
});
