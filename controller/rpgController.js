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
            const id = req.params.id;
            if (id.length === 12 || 24){

            }

            rpgRepository.findDocument(db, req.params.id, function(docs) {
                res.json(docs);
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

            rpgRepository.findAllDocuments(db, function(docs) {
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
            const document = req.body.toArray();

            rpgRepository.insertDocuments(db, document, function(result) {
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

            rpgRepository.updateDocument(db, req.params.id, req.body, function(result) {
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

            rpgRepository.removeDocument(db, req.params.id, function(result) {
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

