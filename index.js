const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


//middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://emon:vh2r5bo7pF8tYtNR@cluster0.3sahu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     // client.close();
//     console.log('DB connected');
// });

async function run() {
    try {
        await client.connect();
        const notesCollection = client.db("notesTaker").collection("notes");
        console.log('connected to db');



        //get api to read all notes
        app.get('/notes', async (req, res) => {
            const query = req.query;
            const cursor = notesCollection.find({});
            const result = await cursor.toArray()
            res.send(result)
        })


        //create notesTaker

        // http://localhost:5000/notes
        /**
         * body{
            "userName":"Habib",
            "textData":"Whats Up!"
         * }
         * 
         */
        app.post('/note', async (req, res) => {
            const data = req.body
            console.log(data);


            const result = await notesCollection.insertOne(data)
            res.send(result)
        })


        //update notesTaker



        //delete notesTaker



    }

    finally {

    }
}
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('Hello World!')


})



app.listen(port, () => {
    console.log('Listening to port: ', port);
})