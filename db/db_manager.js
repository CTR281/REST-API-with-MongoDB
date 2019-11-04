var db = require('./db');

class Db_manager{

    getUser(req,res){
        return res.status(200).send("ok");
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

const handler = new Db_manager();
module.exports = handler;

