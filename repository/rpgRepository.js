const mongo = require('mongodb');
const assert = require('assert');


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

removeDocument = function(db, id, callback) {
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

module.exports = {
    findDocument,
    findAllDocuments,
    insertDocuments,
    updateDocument,
    removeDocument,
};