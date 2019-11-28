const express = require('express');

const controller = require('../controller/rpgController').controller;


const router = express.Router();

router.get('/:collection', (req, res) => controller.getAllDocument(req, res));
router.get('/:collection/:id', (req, res) => controller.getDocument(req, res));
router.post('/:collection', (req, res) => controller.addDocument(req, res));
router.put('/:collection/:id', (req, res) => controller.updateDocument(req, res));
router.delete('/:collection/:id', (req, res) => controller.deleteDocument(req, res));

module.exports = router;
