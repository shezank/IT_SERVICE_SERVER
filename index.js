const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nbfug7m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      const database = client.db("pabnaIT");
      const servicesCollection = database.collection("services");
      
      app.get('/services', async (req,res)=>{
          const quary = {};
          const cursor = await servicesCollection.find(quary);
          const result = await cursor.toArray();
          res.send(result);
      });

      app.get('/services/:id', async (req,res)=>{
          const id = req.params.id;
          const cursor = {_id: ObjectId(id)};
          const result = await servicesCollection.findOne(cursor);
          res.send(result);
      });

      app.post('/services', async (req,res)=>{
          const services = req.body;
          const result = await servicesCollection.insertOne(services);
          res.send(result);
      });
      

      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});