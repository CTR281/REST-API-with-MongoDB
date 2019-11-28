const mongo = require('mongodb');
const assert = require('assert');


findDocument = function(db, collection, id, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    //Check id format
    if (id.length !== 12 && id.length !== 24){
        return callback({error:"Invalid id"});
    }
    // Find some documents
    _collection.find({'_id': new mongo.ObjectID(id)}).toArray(function(err, result) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(result);
            callback({docs: result});
    });
};

findAllDocuments = function(db, collection, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    // Find some documents
    _collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback({docs:docs});
    });
};

insertDocuments = function(db, collection, data, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    // Insert some documents
    console.log(data);
    _collection.insertOne(data, function(err, result) {
        assert.equal(err, null);
        result = "Inserted documents into the collection";
        console.log(result);
        callback({message:result});
    });
};

updateDocument = function(db, collection, id, document, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    // Update document where id is id with document
    _collection.updateOne({'_id': new mongo.ObjectID(id)}
        , { $set: document }, function(err, result) {
            assert.equal(err, null)
            result = "Updated the document with id:"+id;
            console.log("Updated the document");
            callback({message:result});
        });
};

removeDocument = function(db, collection, id, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    // Delete document where id is id
    _collection.deleteOne({'_id': new mongo.ObjectID(id)}, function(err, result) {
        assert.equal(err, null);
        result = "Removed the document with the id:" + id;
        console.log("Removed the document with id:");
        callback({message:result});
    });
};

module.exports = {
    findDocument,
    findAllDocuments,
    insertDocuments,
    updateDocument,
    removeDocument,
};