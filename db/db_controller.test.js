// imports
const config = require('config');
const mongoClient = require('mongodb').MongoClient;
const db_controller = require('./db_controller');
const db_utils = require('./utils');

// db connection info
const db_host = config.get('database.host');
const db_port = config.get('database.port');
const db_user = config.get("database.user");
const db_name = config.get("database.name");
const db_password = config.get("database.password");
const db_url = `mongodb+srv://${db_user}:${db_password}@${db_host}` + (db_port ? `:${db_port}` : "") + "/";


// delete all document in the rpg collection
function clearRPGCollection() {
    const client = new mongoClient(db_url);
    client.connect(function(err) {
        if (err) throw err;
        const targetDb = client.db(db_name);
        const targetCollection = targetDb.collection("rpg");
        targetCollection.deleteMany(new Document());
        client.close();
    })
}


// tests pre and post process
beforeEach(() => { clearRPGCollection() });

afterEach(() => { clearRPGCollection() });


//tests
describe('getAllDocument', () => {
    test("empty database", () => {
        expect(characters.size).toEqual(0);
    });

    test("2 characters", () => {
        db_controller.addUser(db_utils.parseCharacter("Gandalf|75|Wandering Wizard"));
        db_controller.addUser(db_utils.parseCharacter("Saruman|75|White Wizard"));

        var characters = db_controller.getAllDocument();

        expect(characters.size).toEqual(2);
        expect(characters[0]).toEqual(db_utils.parseRPG("Gandalf, 75, Wandering Wizard"));
        expect(characters[1]).toEqual(db_utils.parseRPG("Saruman, 75, White Wizard"));
    });
});

describe('addU');