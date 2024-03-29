const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app =express();
const port = process.env.PORT || 5000;







app.use(cors())
app.use(express.json())





const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jg43ilw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

const productCollation =client.db('brands').collection('brands')
const CardctCollaction = client.db('brands').collection('product');


app.get('/brands', async(req,res)=>{
    const cursor = productCollation.find();
    const result = await cursor.toArray();
    res.send(result)
})


app.post('/brands',async(req,res)=>{
    const newProduct = req.body;
    console.log(newProduct);
    const result = await productCollation.insertOne(newProduct);
    res.send(result)

}) 
// 21121


app.get('/product', async(req,res)=>{
    const cursor = CardctCollaction.find();
    const result = await cursor.toArray();
    res.send(result)
})

app.get('/:id', async(req,res)=>{
    const id = req.params.id
    const cursor = CardctCollaction.find({brand: id});
    const result = await cursor.toArray();
    res.send(result)    
})
 
app.post("/product",async(req,res)=>{
    const newproduct = req.body;
    console.log(newproduct);
    const result = await CardctCollaction.insertOne(newproduct);
    res.send(result)
})



 

app.get('/product/:id',async(req,res)=>{
  const id =req.params.id;
  // console.log("id",id)
  const query ={ _id:new ObjectId(id)};
  const result = await CardctCollaction.findOne(query);
  res.send(result);
})



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req,res)=>{
    res.send('product is running')
})

app.listen(port,()=>{
 console.log(`product card on port:${port}`);
})