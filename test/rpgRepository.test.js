// imports
const config = require('config');
const mongoClient = require('mongodb').MongoClient;
const rpgRepository = require('../repository/rpgRepository');
const dbUtils = require('./utils');


// delete all document in the rpg collection
function clearTestsCollection() {
    const client = new mongoClient(dbUtils.getURL());
    client.connect(function(err) {
        if (err) throw err;
        const targetDb = client.db(config.get('database.name'));
        const targetCollection = targetDb.collection("tests");
        targetCollection.deleteMany(new Document());
        client.close();
    })
}


// tests pre and post process
beforeEach(() => { clearTestsCollection() });

afterEach(() => { clearTestsCollection() });


//tests
describe('insertDocument & findAllDocuments', () => {
    test("empty database", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.findAllDocuments(db,"tests", function(result) {
                expect(result.docs.length).toEqual(0);
            });

            client.close();
        })
    });

    test("normal usage", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.insertDocuments(db, "tests", dbUtils.parseCharacter("Gandalf|75|Grey Wizard"), function(result) {
                    expect(result.message).toEqual("Inserted documents into the collection");
            });
            rpgRepository.insertDocuments(db, dbUtils.parseCharacter("Radagast|75|Brown Wizard"), function(result) {
                    expect(result.message).toEqual("Inserted documents into the collection");
            });

            rpgRepository.findAllDocuments(db,function(result) {
                expect(result.docs.length).toEqual(2);
                expect(result.docs[0]).toEqual(dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));
                expect(result.docs[1]).toEqual(dbUtils.parseCharacter("Radagast|75|Brown Wizard"));
            });

            client.close();
        });
    });
});

describe("findDocument", () => {
    test("target document doesn't exist", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.findDocument(db, "test", "mydoc", function (result) {
                expect(result.error).toBeNull();
                expect(result.docs.length).toEqual(0);
            });

            client.close();
        });
    });

    test("normal use", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.insertDocuments(db, "tests", dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));
            rpgRepository.insertDocuments(db, "tests", dbUtils.parseCharacter("Radagast|75|Brown Wizard"));

            rpgRepository.findAllDocuments(db,"tests", function(result) {
                rpgRepository.findDocument(db, result.docs[0].id, function (char) {
                    expect(char.docs.length).toEqual(1);
                    expect(char.docs[0]).toEqual(dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));
                });
                rpgRepository.findDocument(db, result.docs[1].id, function (char) {
                    expect(char.docs.size).toEqual(1);
                    expect(char.docs[1]).toEqual(dbUtils.parseCharacter("Radagast|75|Brown Wizard"));
                });
            });

            client.close();
        });
    });
});

describe("updateDocument", () => {
    test("normal use", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.insertDocuments(db, dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));

            rpgRepository.findAllDocuments(db,function(result) {
                rpgRepository.updateDocument(db, result.docs[0],
                    dbUtils.parseCharacter("Gandalf|100|White Wizard"),
                    function (result) {
                    expect(result.message).toEqual("Updated the document with id:"+docs[0]);
                });
            });

            rpgRepository.findAllDocuments(db,function(result) {
                expect(result.docs.length).toEqual(1);
                expect(result.docs[0]).toEqual(dbUtils.parseCharacter("Gandalf|100|White Wizard"));
            });

            client.close();
        });
    });
});

describe("removeDocument", () => {
    test("document doesn't exist", () => {
        const client = new mongoClient(dbUtils.getURL());
        client.connect(function(err) {
            if (err) throw err;

            const db = client.db(config.get('database.name'));

            rpgRepository.removeDocument(db, "test", "test",function(result) {
                expect(result.message).toEqual("Removed the document with the id:"+"test");
            });

            rpgRepository.findAllDocuments(db,function(docs) {
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

            rpgRepository.insertDocuments(db, "tests", dbUtils.parseCharacter("Gandalf|75|Grey Wizard"));

            rpgRepository.findAllDocuments(db,function(result) {
                rpgRepository.removeDocument(db, result.docs[0],function (char) {
                    expect(char.message).toEqual("Removed the document with the id:"+result.docs[0]);
                });
            });

            rpgRepository.findAllDocuments(db,function(result) {
                expect(result.docs.length).toEqual(0);
            });

            client.close();
        });
    });
});