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

findDocument = function(db, id, callback) {
    // Get the documents collection
    const collection = db.collection('rpg');
    // Find some documents
    collection.find({'_id': new mongo.ObjectID(id)}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

findAllDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('rpg');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

insertDocuments = function(db, data, callback) {
    // Get the documents collection
    const collection = db.collection('rpg');
    // Insert some documents
    console.log(data);
    collection.insertMany(data, function(err, result) {
        assert.equal(err, null);
        result = "Inserted documents into the collection";
        console.log(result);
        callback(result);
    });
};

updateDocument = function(db, id, document, callback) {
    // Get the documents collection
    const collection = db.collection('rpg');
    console.log(document);
    // Update document where id is id with document
    collection.updateOne({'_id': new mongo.ObjectID(id)}
        , { $set: document }, function(err, result) {
            assert.equal(err, null);
            result = "Updated the document with id:"+id;
            console.log("Updated the document");
            callback(result);
        });
};

const removeDocument = function(db, id, callback) {
    // Get the documents collection
    const collection = db.collection('rpg');
    // Delete document where id is id
    collection.deleteOne({'_id': new mongo.ObjectID(id)}, function(err, result) {
        assert.equal(err, null);
        result = "Removed the document with the id:" + id;
        console.log("Removed the document with the id:");
        callback(result);
    });
};


class Db_controller{

    getDocument(req,res){
        const client = new MongoClient(db_url);
        client.connect(function(err){
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(db_name);

            findDocument(db, req.params.id, function(docs) {
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

            findAllDocuments(db, function(docs) {
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

            insertDocuments(db, [req.body], function(result) {
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

            updateDocument(db, req.params.id, req.body, function(result) {
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

            removeDocument(db, req.params.id, function(result) {
                res.send(result);
                client.close();
            });
        });
    }
}

const controller = new Db_controller();
module.exports = {
    controller,
    findAllDocuments,
    findDocument,
    insertDocuments,
    updateDocument,
    removeDocument
};

