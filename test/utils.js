var mongoClient = require('mongodb').MongoClient;
const faker = require('faker');
var randomInt = require('random-int');
const config = require('config');

function fakeCharacter () {
    // return a fake rpg character
    return {
        name: faker.name.lastName(),
        level: randomInt(1,100),
        class: faker.name.jobTitle() };
}

function parseCharacter(toParse) {
    const tokens = toParse.split('|');
    return {
        name: tokens[0],
        level:parseInt(tokens[1]),
        class: tokens[2] }
}

function populateCollection (url, dbName, collection, elementsGenerator, number) {
    const client = new mongoClient(url);

    client.connect(function(err) {
        if (err) {
            console.log(`Error connecting to: ${url}\n`);
            throw err;
        }

        console.log(`Adding ${number} element(s) to: \n=> url: ${url} \n=> db: ${dbName} \n=> collection: ${collection} \n`);

        // Access the controller
        const targetDb = client.db(dbName);
        // Get the collection
        const targetCollection = targetDb.collection(collection);
        //Add the elements
        for (let i = 0; i < number ; i++) {
            targetCollection.insertOne(elementsGenerator())
        }

        //End the conection
        client.close();
        console.log("Done !");
    });
}

function  getURL() {
    const host = config.get('database.host');
    const port = config.get('database.port');
    const user = config.get("database.user");
    const password = config.get("database.password");
    return `mongodb+srv://${user}:${password}@${host}` + (port ? `:${port}` : "") + "/";
}

module.exports = { fakeCharacter ,
                   parseCharacter,
                   populateCollection,
                   getURL };