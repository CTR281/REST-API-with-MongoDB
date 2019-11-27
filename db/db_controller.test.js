// imports
const mongoClient = require('mongodb').MongoClient;
const db_controller = require('./db_controller');
const db_utils = require('./utils');

// db connection info
const db_url = db_utils.getURL();


// delete all document in the rpg collection
function clearRPGCollection() {
    const client = new mongoClient(db_url);
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
        const characters = db_controller.getAllDocument();

        expect(characters.size).toEqual(0);
    });

    test("2 characters", () => {
        db_controller.addDocument(db_utils.parseCharacter("Gandalf|75|Wandering Wizard"));
        db_controller.addDocument(db_utils.parseCharacter("Radagast|75|Brown Wizard"));

        const characters = db_controller.getAllDocument();

        expect(characters.size).toEqual(2);
        expect(characters[0]).toEqual(db_utils.parseCharacter("Gandalf, 75, Wandering Wizard"));
        expect(characters[1]).toEqual(db_utils.parseCharacter("Radagast|75|Brown Wizard"));
    });
});

describe("getDocument", () => {
    test("target doesn't exist", () => {
        const character = db_controller.getDocument("test");

        expect(characters).toBeUndefined();
    });

    test("normal use", () => {
        db_controller.addDocument(db_utils.parseCharacter("Gandalf|75|Wandering Wizard"));

        const characters = db_controller.getAllDocument();
        const id = characters[0].id;
        const character = db_controller.getDocument(id);

        expect(character).toEqual(db_utils.parseCharacter("Gandalf|75|Wandering Wizard"));
    });
});

describe("updateDocument", () => {
    test("document doesn't exist", () => {
        db_controller.updateDocument("test", db_utils.parseCharacter("Gandalf, 75, White Wizard"))
        // no error throw
    })

    test("normal usage", () => {
        db_controller.addDocument(db_utils.parseCharacter("Gandalf|75|Grey Wizard"));

        let characters = db_controller.getAllDocument();
        const id = characters[0].id;
        db_controller.updateDocument(id, db_utils.parseCharacter("Gandalf, 75, White Wizard"));
        characters = db_controller.getAllDocument();

        expect(characters.size).toEqual(1);
        expect(characters[0]).toEqual(db_utils.parseCharacter("Gandalf, 75, White Wizard"));
    });
});

describe("deleteDocument", () => {
    test("document doesn't exist", () => {
        db_controller.deleteDocument("test");
    });
    test("normal useage", () => {
        db_controller.addDocument(db_utils.parseCharacter("Gandalf|75|Grey Wizard"));

        let characters = db_controller.getAllDocument();
        const id = characters[0].id;
        db_controller.deleteDocument(id, db_utils.parseCharacter("Gandalf, 75, White Wizard"));
        characters = db_controller.getAllDocument();

        expect(characters.size).toEqual(0);
    })
});