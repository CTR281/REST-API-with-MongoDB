// imports
const config = require('config');
const mongoClient = require('mongodb').MongoClient;
const rpgRepository = require('../repository/rpgRepository');
const dbUtils = require('./utils');


// delete all document in the rpg collection
function clearRPGCollection() {
    const client = new mongoClient(dbUtils.getURL());
    client.connect(function(err) {
        if (err) throw err;
        const targetDb = client.db(config.get('database.name'));
        const targetCollection = targetDb.collection("rpg");
        targetCollection.deleteMany(new Document());
        client.close();
    })
}


// tests pre and post process
beforeEach(() => { clearRPGCollection() });

afterEach(() => { clearRPGCollection() });


//tests
describe('insertDocument & findAllDocument', () => {
    test("empty database", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.findAllDocuments(db,function(docs) {
                expect(docs.size).toEqual(0);
            });

            client.close();
        })
    });

    test("normal usage", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.insertDocuments(db, dbUtils.parseCharacter("Gandalf|75|Grey Wizard"), function(result) {
                    expect(result).toEqual("Inserted documents into the collection");
            });
            rpgRepository.insertDocuments(db, dbUtils.parseCharacter("Radagast|75|Brown Wizard"), function(result) {
                    expect(result).toEqual("Inserted documents into the collection");
            });

            rpgRepository.findAllDocuments(db,function(docs) {
                expect(docs.size).toEqual(2);
                expect(docs[0]).toEqual(dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));
                expect(docs[1]).toEqual(dbUtils.parseCharacter("Radagast|75|Brown Wizard"));
            });

            client.close();
        });
    });
});

describe("findDocument", () => {
    test("document doesn't exist", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.findDocument(db, "test", function (err, docs) {
                expect(err).toBeNull();
                expect(docs.size).toEqual(0);
            });

            client.close();
        });
    });

    test("normal use", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.insertDocuments(db, dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));
            rpgRepository.insertDocuments(db, dbUtils.parseCharacter("Radagast|75|Brown Wizard"));

            rpgRepository.findAllDocuments(db,function(docs) {
                rpgRepository.findDocument(db, docs[0].id, function (docs) {
                        expect(docs.size).toEqual(1);
                        expect(docs[0]).toEqual(dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));
                });
                rpgRepository.findDocument(db, docs[1].id, function (docs) {
                    expect(docs.size).toEqual(1);
                    expect(docs[1]).toEqual(dbUtils.parseCharacter("Radagast|75|Brown Wizard"));
                });
            });

            client.close();
        });
    });
});

describe("updateDocument", () => {
    test("document doesn't exist", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.updateDocument(db, "test", dbUtils.parseCharacter("Gandalf|100|White Wizard"),function (result) {
                expect(result).toBeNull("Updated the document with id:"+"test");
            });

            rpgRepository.findAllDocuments(db,function(docs) {
                expect(docs.size).toEqual(0);
            });

            client.close();
        });
    });

    test("normal usage", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.insertDocuments(db, dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));

            rpgRepository.findAllDocuments(db,function(docs) {
                rpgRepository.updateDocument(db, docs[0], dbUtils.parseCharacter("Gandalf|100|White Wizard"),function (result) {
                    expect(result).toEqual("Updated the document with id:"+docs[0]);
                });
            });

            rpgRepository.findAllDocuments(db,function(docs) {
                expect(docs.size).toEqual(1);
                expect(docs[0]).toEqual(dbUtils.parseCharacter("Gandalf|100|White Wizard"));
            });

            client.close();
        });
    });
});

describe("deleteDocument", () => {
    test("document doesn't exist", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.removeDocument(db, "test", function(result) {
                expect(result).toEqual("Removed the document with the id:"+"test");
            });

            rpgRepository.findAllDocuments(db,function(docs) {
                expect(docs.size).toEqual(0);
            });

            client.close();
        });
    });

    test("normal useage", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.insertDocuments(db, dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));

            rpgRepository.findAllDocuments(db,function(docs) {
                rpgRepository.removeDocument(db, docs[0],function (result) {
                    expect(result).toEqual("Removed the document with the id:"+docs[0]);
                });
            });

            rpgRepository.findAllDocuments(db,function(docs) {
                expect(docs.size).toEqual(0);
            });

            client.close();
        });
    });
});