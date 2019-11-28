const express = require('express');

const controller = require('../controller/rpgController').controller;


const router = express.Router();

router.get('/', (req, res) => controller.getAllDocument(req, res));
router.get('/:id', (req, res) => controller.getDocument(req, res));
router.post('/', (req, res) => controller.addDocument(req, res));
router.put('/:id', (req, res) => controller.updateDocument(req, res));
router.delete('/:id', (req, res) => controller.deleteDocument(req, res));

module.exports = router;
