const config = require('config');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const db_host = config.get('database.host');
const db_port = config.get('database.port');
const db_user = config.get("database.user");
const db_name = config.get("database.name");
const db_password = config.get("database.password");

const db_url = `mongodb+srv://${db_user}:${db_password}@${db_host}` + (db_port ? `:${db_host}/` : "") + "/";

const client = new MongoClient(db_url);

findDocument = function(db, id, callback) {
    // Get the documents collection
    const collection = db.collection('rpg');
    // Find some documents
    collection.find({'_id': id}).toArray(function(err, docs) {
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

insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('rpg');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};


class Db_controller{

    getDocument(req,res, id){
        client.connect(function(err){
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(db_name);

            findDocument(db, id, function(docs) {
                res.json(docs);
                client.close();
            });
        });
    }

    getAllDocument(req,res){
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

    addUser(req,res){
        return res.status(200).send("ok");
    }

    updateUser(req,res){
        return res.status(200).send("ok");
    }

    deleteUser(req,res){
        return res.status(200).send("ok");
    }

}

const handler = new Db_controller();
module.exports = handler;

