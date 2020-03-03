
let express = require('express');
let router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const uri = "mongodb+srv://admin:admin@cluster0-5ey3n.mongodb.net";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




router.get('/list', (request, response) => {
    let battleLocation = [];

    MongoClient.connect(uri,(err, db) => {
        if (err) throw err;
        let database = db.db("gotSample");
        database.collection("got").find({}).toArray((err, result) => {
            if (err) throw err;
            //console.log(result);
            for (var i = 0; i < result.length; i++) {
                let loc = result[i].location;
                //console.log(loc);
                if (loc != "")
                    battleLocation.push(loc);
            }
            response.send(battleLocation);
            console.log(battleLocation);
            db.close();
        });
    });
})






module.exports = router;