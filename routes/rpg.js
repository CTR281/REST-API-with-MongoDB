const express = require('express');

const controller = require('../db/db_controller');


const router = express.Router();

//router.get('/', (req,res) => {res.send("Bienvenue sur l'api REST 'RPG'. /rpg pour afficher toutes les entrées de la db" )});
router.get('/', (req,res) => controller.getAllDocument(req,res));
router.get('/:id', (req,res) => controller.getDocument(req,res, req.params.id));
router.post('/', (req,res) => controller.addUser(req,res));
//router.delete(`/rpg/${id}`, (req,res, id) => handler.deleteUser(req,res));

module.exports = router;
