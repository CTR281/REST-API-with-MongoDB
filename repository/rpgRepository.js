const mongo = require('mongodb');


findDocument = function(db, collection, id, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    //Check id format
    if (id.length !== 12 && id.length !== 24){
        return callback({error:"Invalid id"});
    }
    // Find some documents
    _collection.find({'_id': new mongo.ObjectID(id)}).toArray(function(err, docs) {
        if (!err){
            console.log("Found the following records");
            console.log(docs);
            callback({docs: docs});
        }
        else{
            console.log(err);
            callback(err);
        }
    });
};

findAllDocuments = function(db, collection, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    // Find some documents
    _collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

insertDocuments = function(db, collection, data, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    // Insert some documents
    console.log(data);
    _collection.insertMany(data, function(err, result) {
        result = "Inserted documents into the collection";
        console.log(result);
        callback(result);
    });
};

updateDocument = function(db, collection, id, document, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    // Update document where id is id with document
    _collection.updateOne({'_id': new mongo.ObjectID(id)}
        , { $set: document }, function(err, result) {
            result = "Updated the document with id:"+id;
            console.log("Updated the document");
            callback(result);
        });
};

removeDocument = function(db, collection, id, callback) {
    // Get the documents collection
    const _collection = db.collection(collection);
    // Delete document where id is id
    _collection.deleteOne({'_id': new mongo.ObjectID(id)}, function(err, result) {
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