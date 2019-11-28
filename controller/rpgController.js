const config = require('config');
const assert = require('assert');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const DB = config.get('database');

const db_url = `mongodb+srv://${DB.user}:${DB.password}@${DB.host}` + (DB.port ? `:${DB.port}` : "") + "/";

const rpgRepository = require('../repository/rpgRepository');

class rpgController{

    getDocument(req,res){
        const client = new MongoClient(db_url);
        client.connect(function(err){
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(DB.name);
            const collection  = req.params.collection;
            const id = req.params.id;


            rpgRepository.findDocument(db, collection, id, function(result) {
                result.error?res.send(result.error):res.json(result.docs);
                client.close();
            });
        });
    }

    getAllDocument(req,res){
        const client = new MongoClient(db_url);
        client.connect(function(err){
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(DB.name);
            const collection  = req.params.collection;

            rpgRepository.findAllDocuments(db, collection,function(docs) {
                res.json(docs);
                client.close();
            });
        });
    }

    addDocument(req,res){
        const client = new MongoClient(db_url);
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(DB.name);
            const collection  = req.params.collection;
            const document = [req.body];
            console.log(document);

            rpgRepository.insertDocuments(db, collection, document, function(result) {
                res.send(result);
                client.close();
            });
        });
    }

    updateDocument(req,res){
        const client = new MongoClient(db_url);
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(DB.name);
            const collection  = req.params.collection;
            const id = req.params.id;
            const document = req.body;

            rpgRepository.updateDocument(db, collection, id, document, function(result) {
                res.send(result);
                client.close();
            });
        });
    }

    deleteDocument(req,res){
        const client = new MongoClient(db_url);
        client.connect(function(err){
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(DB.name);
            const collection  = req.params.collection;
            const id = req.params.id;

            rpgRepository.removeDocument(db, collection, id, function(result) {
                res.send(result);
                client.close();
            });
        });
    }
}

const controller = new rpgController();

module.exports = {
    controller,
};

