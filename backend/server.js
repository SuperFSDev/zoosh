const { MongoClient } = require("mongodb");

const url = "mongodb+srv://tasq-admin:tasq@tasq-db.pb6yq.mongodb.net/tasqdb?retryWrites=true&w=majority";
const client = new MongoClient(url);

 // The database to use
 const dbName = "tasqdb";

 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the users collection.
         const col = db.collection("users");

         /* Test data
         let user = {
             "name": { "first": "Conor", "last": "Shortt" },
             "birth": new Date(1998, 5, 24),
             "death": new Date(2341, 5, 7),
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }*/

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(user);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }

     finally {
        await client.close();
    }
}

run().catch(console.dir);