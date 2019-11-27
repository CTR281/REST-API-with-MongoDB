var faker = require('faker');
var randomInt = require('random-int');
var mongoClient = require('mongodb').MongoClient;


function fakeCharacter () {
    // return a fake rpg character
    return { name: faker.name.lastName(),
             level: randomInt(1,100),
             class: faker.name.jobTitle() };
}

function parseCharacter(toParse) {
    var array = toParse.split('|');
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

module.exports = { populateCollection,
                   fakeCharacter,
                   parseCharacter };