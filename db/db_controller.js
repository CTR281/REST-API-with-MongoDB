const config = require('config');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const db_host = config.get('database.host');
const db_port = config.get('database.port');
const db_user = config.get("database.user");
const db_name = config.get("database.name");
const db_password = config.get("database.password");

const db_url = `mongodb+srv://${db_user}:${db_password}@${db_host}` + (db_port ? `:${db_host}/` : "") + "/";

const client = new MongoClient(db_url);


class Db_controller{

    getUser(req,res){
        client.connect(function(err){
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(db_name);

            const findDocuments = function(db, res) {
                // Get the documents collection
                const collection = db.collection('rpg');
                console.log("ok");
                collection.find({}).toArray(function (err, docs) {
                    assert.equal(err, null);
                    console.log("Found the following records");
                    console.log(docs);
                    res.send(docs);
                });
            };
            client.close();
        });
    }

    addUser(req,res){
        return res.status(200).send("ok");
    }

    updateUser(req,res){
        return res.status(200).send("ok");
    }

    deleteUser(req,res){
        return res.status(200).send("ok");
    }

}

const handler = new Db_controller();
module.exports = handler;

