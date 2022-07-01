const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// DB_USER=power-hacker
// DB_PASS=zjPSUIzQRYrjnqIH

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wobaq.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri);

async function run() {

    try {

        await client.connect()
        console.log('database connected');

        const billCollection = client.db("power-hacker").collection("bills")

        app.get('/billing-list', async (req, res) => {

            const query = {}
            const cursor = billCollection.find(query);
            const bills = await cursor.toArray()
            res.send(bills)

        })



    }

    finally {


    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})