var express = require('express');
var handler = require('../db/db_manager');

const router = express.Router();

router.get('/', (req,res) => {res.send("Yeah boi")});
router.get('/user', (req,res) => handler.getUser(req,res));
router.post('/user', (req,res) => handler.addUser(req,res));
router.delete('/user', (req,res) => handler.deleteUser(req,res));

module.exports = router;
