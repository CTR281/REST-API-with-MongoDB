const express = require('express');

const controller = require('../db/db_controller');


const router = express.Router();

router.get('/', (req,res) => controller.getAllDocument(req,res));
router.get('/:id', (req,res) => controller.getDocument(req,res, req.params.id));
router.post('/', (req,res) => controller.addDocument(req,res));
//router.delete(`/rpg/${id}`, (req,res, id) => handler.deleteUser(req,res));

module.exports = router;
