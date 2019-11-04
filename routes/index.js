var express = require('express');
<<<<<<< HEAD
var handler = require('../db/db_manager');
=======
var handler = require('../db/Handler');
>>>>>>> 528d8bb06ed53bb3bab0bde451225950f29a83db

const router = express.Router();

router.get('/', (req,res) => {res.send("Yeah boi")});
router.get('/user', (req,res) => handler.getUser(req,res));
router.post('/user', (req,res) => handler.addUser(req,res));
router.delete('/user', (req,res) => handler.deleteUser(req,res));

module.exports = router;
