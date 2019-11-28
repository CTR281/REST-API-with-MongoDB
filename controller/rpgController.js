const config = require('config');
const assert = require('assert');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const db_host = config.get('database.host');
const db_port = config.get('database.port');
const db_user = config.get("database.user");
const db_name = config.get("database.name");
const db_password = config.get("database.password");

const db_url = `mongodb+srv://${db_user}:${db_password}@${db_host}` + (db_port ? `:${db_port}` : "") + "/";

const rpgRepository = require('../repository/rpgRepository');

class rpgController{

    getDocument(req,res){
        const client = new MongoClient(db_url);
        client.connect(function(err){
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(db_name);
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

            const db = client.db(db_name);

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

            const db = client.db(db_name);

            rpgRepository.insertDocuments(db, [req.body], function(result) {
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

            const db = client.db(db_name);

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

            const db = client.db(db_name);

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

