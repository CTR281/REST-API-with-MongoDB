const express = require('express');

const controller = require('../db/db_controller');


const router = express.Router();

router.get('/', function(req, res) {
    controller.getAllDocument('rpg', function(err, docs) {
        if (err) throw err;
        res.json(docs);
    })
});
router.post('/', function(req, res) {
    controller.addDocument('rpg', req.body, function (err) {
        if (err) throw err;
        res.send("Document Inserted");
    })
});


router.get('/:id', function(req, res) {
    controller.getDocument('rpg', req.params.id, function (err, docs) {
        if (err) throw err;
        res.json(docs);
    })
});
router.put('/:id', function(req, res) {
    controller.updateDocument('rpg', req.params.id,req.body,function(err) {
        if (err) throw err;
        res.send("Document Updated");
    })
});
router.delete('/:id', function(req, res) {
    controller.deleteDocument('rpg', req.params.id, function(err) {
        if (err) throw err;
        res.send("Document deleted");
    })
});

module.exports = router;
