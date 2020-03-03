
let express = require('express');
let router = express.Router();
const MongoClient = require('mongodb').MongoClient;


const uri = "mongodb+srv://admin:admin@cluster0-5ey3n.mongodb.net";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/count', (request, response) => {

    MongoClient.connect(uri,(err, db) => {
        if (err) throw err;
        let database = db.db("gotSample");
        database.collection("got").countDocuments({}, (err, count) => {
            response.json({"Total number of battles occurred":count});
            console.log("Total battles :" + count);
            db.close();
        });
    });
});



module.exports = router;