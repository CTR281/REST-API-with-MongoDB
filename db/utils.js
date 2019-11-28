const config = require('config');
var mongoClient = require('mongodb').MongoClient;
const faker = require('faker');
var randomInt = require('random-int');

function fakeCharacter () {
    // return a fake rpg character
    return { name: faker.name.lastName(),
        level: randomInt(1,100),
        class: faker.name.jobTitle() };
}

function parseCharacter(toParse) {
    const array = toParse.split('|');
    return { name: array[0],
        level:parseInt(array[1]),
        class: array[2] }
}

function populateCollection (url, dbName, collection, elementsGenerator, number) {
    const client = new mongoClient(url);

    client.connect(function(err) {
        if (err) {
            console.log(`Error connecting to: ${url}\n`);
            throw err;
        }

        console.log(`Adding ${number} element(s) to: \n=> url: ${url} \n=> db: ${dbName} \n=> collection: ${collection} \n`);

        // Access the db
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
    const db_host = config.get('database.host');
    const db_port = config.get('database.port');
    const db_user = config.get("database.user");
    const db_password = config.get("database.password");
    const db_url = `mongodb+srv://${db_user}:${db_password}@${db_host}` + (db_port ? `:${db_port}` : "") + "/";
    return db_url;
}

module.exports = { fakeCharacter ,
                   parseCharacter,
                   populateCollection,
                   getURL };