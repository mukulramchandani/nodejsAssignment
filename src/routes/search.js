let express = require('express');
let router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@cluster0-5ey3n.mongodb.net";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

router.get('/search', (request,response) => {
    let query = {}; //builds query
    console.log(request.query);
    if(request.query.king){
         query = {$or : [{"attacker_king" : request.query.king},{"defender_king" : request.query.king}]}
         if(request.query.location)
         query["location"] = request.query.location;
         if(request.query.type)
         query["battle_type"] = request.query.type
    }

    MongoClient.connect(uri,(err, db) => {
        if (err) throw err;
        let database = db.db("gotSample");
        database.collection("got").find(query).toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            result.length > 0 ? response.json(result) : response.json({"message" : "No data found for the query"});
            db.close();
        });
    });



});


module.exports = router;