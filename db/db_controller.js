const config = require('config');
const assert = require('assert');
const mongo = require('mongodb');
const dbUtils = require('./utils');
const MongoClient = mongo.MongoClient;


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
    collection.updateOne({'_id': new mongo.ObjectID(id)}, { $set: document }, function(err, result) {
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
    getDocument(collectionName, documentId, callback) {
        // create the client and connect to the db
        const client = new MongoClient(dbUtils.getURL());
        client.connect(function(err){
            if (err) throw err;

            // go to the collection
            const db = client.db(config.get('database.name'));
            const collection = db.collection(collectionName);

            // search for the document
            collection.find({ '_id': new mongo.ObjectID(documentId) }).toArray(function(err, docs) {
                if (err) throw err;
                client.close();
                callback(null, docs);
            });

            // findDocument(db, collection, id, function(docs) {
            //     res.json(docs);
            //     client.close();
            // });
        });
    }

    getAllDocument(collectionName, callback) {
        // create the client and connect to the db
        const client = new MongoClient(dbUtils.getURL());
        client.connect(function(err){
            if (err) throw err;

            // go to the collection
            const db = client.db(config.get('database.name'));
            const collection = db.collection(collectionName);

            // get all documents
            collection.find({}).toArray(function(err, docs) {
                if (err) throw err;
                client.close();
                callback(null, docs);
            });

            // findAllDocuments(db, function(docs) {
            //     res.json(docs);
            //     client.close();
            // });
        });
    }

    addDocument(collectionName, document, callback) {
        // create the client and connect to the db
        const client = new MongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            // go to the collection
            const db = client.db(config.get('database.name'));
            const collection = db.collection(collectionName);

            // Insert the documents
            collection.insertOne(document, function(err) {
                if (err) throw err;
                client.close();
                callback(null);
            });

            // insertDocuments(db, [req.body], function(result) {
            //     res.send(result);
            //     client.close();
            // });
        });
    }

    updateDocument(collectionName, documentId, document ,callback) {
        // create the client and connect to the db
        const client = new MongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            // go to the collection
            const db = client.db(config.get('database.name'));
            const collection = db.collection(collectionName);

            // Update document where id is document's id with document
            collection.updateOne({'_id': new mongo.ObjectID(id)}, { $set: document }, function(err, result) {
                if (err) throw err;
                client.close();
                callback(null);
            });


            // updateDocument(db, req.params.id, req.body, function(result) {
            //     res.send(result);
            //     client.close();
            // });
        });
    }

    deleteDocument(collectionName, documentId, callback) {
        // create the client and connect to the db
        const client = new MongoClient(dbUtils.getURL());
        client.connect(function(err){
            if (err) throw err;

            // go to the collection
            const db = client.db(config.get('database.name'));
            const collection = db.collection(collectionName);

            // Delete document where id is id
            collection.deleteOne({'_id': new mongo.ObjectID(id)}, function(err, callback) {
                if (err) throw err;
                client.close();
                callback(null);
            });

            // removeDocument(db, req.params.id, function(result) {
            //     res.send(result);
            //     client.close();
            // });
        });
    }
}


const controller = new Db_controller();

module.exports = controller;

