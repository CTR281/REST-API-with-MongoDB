// imports
const config = require('config');
const mongoClient = require('mongodb').MongoClient;
const db_controller = require('./db_controller');
const db_utils = require('./utils');

// db connection info
const db_url = db_utils.getURL();


// delete all document in the rpg collection
function clearRPGCollection() {
    const client = new mongoClient(db_url);
    client.connect(function(err) {
        if (err) throw err;
        const targetDb = client.db(dbName);
        const targetCollection = targetDb.collection("rpg");
        targetCollection.deleteMany(new Document());
        client.close();
    })
}


// tests pre and post process
beforeEach(() => { clearRPGCollection() });

afterEach(() => { clearRPGCollection() });


//tests
describe('getAllDocument & addUser', () => {
    test("empty database", () => {
        const characters = db_controller.getAllDocument();

        expect(characters.size).toEqual(0);
    });

    test("2 characters", () => {
        db_controller.addUser(db_utils.parseCharacter("Gandalf|75|Wandering Wizard"));
        db_controller.addUser(db_utils.parseCharacter("Saruman|75|White Wizard"));

        const characters = db_controller.getAllDocument();

        expect(characters.size).toEqual(2);
        expect(characters[0]).toEqual(db_utils.parseCharacter("Gandalf, 75, Wandering Wizard"));
        expect(characters[1]).toEqual(db_utils.parseCharacter("Saruman, 75, White Wizard"));
    });
});

describe("updateUser", () => {
    test("normal usage", () => {

    });

    test("user don't exist", () => {

    })
});

describe("deleteUser", () => {
    test("normal usage", () => {

    });
    test("user don't exist", () => {

    })
});