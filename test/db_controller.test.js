// imports
const MongoClient = require('mongodb').MongoClient;
const db_controller = require('../db/db_controller');
const db_utils = require('../db/utils');

// db connection info
const db_url = db_utils.getURL();


// delete all document in the rpg collection
function clearRPGCollection() {
    const client = new MongoClient(db_url);
    client.connect(function(err) {
        if (err) {
            console.log(db_url);
            throw err;
        }
        const targetDb = client.db(db_name);
        const targetCollection = targetDb.collection("rpg");
        targetCollection.deleteMany(new Document());
        client.close();
    })
}


// tests pre and post process
beforeEach(() => { clearRPGCollection() });
afterEach(() => { clearRPGCollection() });


describe('getAllDocuments & addDocument', () => {
    test("empty database", () => {
        db_controller.getAllDocument('rpg',
            function(err, docs) {
                expect(err).toBeNull();
                expect(docs.size).toEqual(0);
        });
    });

    test("normal use", () => {
        db_controller.addDocument('rpg', db_utils.parseCharacter("Gandalf|75|Wandering Wizard"),
            function(err) {
                expect(err).toBeNull();
            });
        db_controller.addDocument('rpg', db_utils.parseCharacter("Radagast|75|Brown Wizard"),
            function(err) {
                expect(err).toBeNull();
            });

        db_controller.getAllDocument('rpg', function(err, docs) {
            expect(err).toBeNull();
            expect(docs.size).toEqual(2);
            expect(docs[0]).toEqual(db_utils.parseCharacter("Gandalf, 75, Wandering Wizard"));
            expect(docs[1]).toEqual(db_utils.parseCharacter("Radagast|75|Brown Wizard"));
        });
    });
});

describe("getDocument", () => {
    test("document doesn't exist", () => {
        db_controller.getDocument("rpg", "toto",
            function (err, docs) {
                expect(err).toBeNull();
                expect(docs.size).toEqual(0);
            });
    });

    test("normal use", () => {
        db_controller.addDocument("rpg", db_utils.parseCharacter("Gandalf|75|Wandering Wizard"));

        db_controller.getAllDocument("rpg",
            function(err, docs) {
                db_controller.getDocument("rpg", docs[0].id,
                    function (err, docs) {
                        expect(err).toBeNull();
                        expect(docs.size).toEqual(0);
                        expect(docs[0]).toEqual(db_utils.parseCharacter("Gandalf|75|Wandering Wizard"));
            });
        });
    });
});

describe("updateDocument", () => {
    test("document doesn't exist", () => {
        db_controller.updateDocument("rpg", "test", db_utils.parseCharacter("Gandalf|75|White Wizard"),
            function(err) {
                expect(err).toBeNull();
        })
    });

    test("normal usage", () => {
        db_controller.addDocument("rpg", db_utils.parseCharacter("Gandalf|75|Grey Wizard"),
            function(err) {
                expect(err).toBeNull();
            });

        db_controller.getAllDocument("rpg",
            function(err, docs) {
                db_controller.updateDocument("rpg", docs[0].id,db_utils.parseCharacter("Gandalf|75|White Wizard"),
                    function (err, docs) {
                        expect(err).toBeNull();
                    });
            });

        db_controller.getAllDocument("rpg",
            function(err, docs) {
                expect(err).toBeNull();
                expect(docs.size).toEqual(1);
                expect(docs[0]).toEqual(db_utils.parseCharacter("Gandalf|75|White Wizard"));
            })
    });
});

describe("deleteDocument", () => {
    test("document doesn't exist", () => {
        db_controller.deleteDocument("rpg", "test",
            function(err) {
                expect(err).toBeNull();
            });
    });

    test("normal useage", () => {
        db_controller.addDocument("rpg", db_utils.parseCharacter("Gandalf|75|Grey Wizard"),
            function(err) {
                expect(err).toBeNull();
            });

        db_controller.getAllDocument("rpg",
            function(err, docs) {
                db_controller.deleteDocument("rpg", docs[0].id,
                    function (err) {
                        expect(err).toBeNull();
                    });
            });

        db_controller.getAllDocument("rpg",
            function(err, docs) {
                expect(err).toBeNull();
                expect(docs.size).toEqual(0);
            });
    });
});