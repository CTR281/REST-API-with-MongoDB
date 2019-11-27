var express = require('express');

var handler = require('../db/db_controller');


const router = express.Router();

router.get('/', (req,res) => {res.send("This works")});
router.get('/rpg', (req,res) => handler.getUser(req,res));
router.post('/user', (req,res) => handler.addUser(req,res));
router.delete('/user', (req,res) => handler.deleteUser(req,res));

module.exports = router;
