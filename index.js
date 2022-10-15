const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const fileUpload = require("express-fileupload");
const { query } = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pszjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("googleContact");
    const userCollection = database.collection("user");
    const labelCollection = database.collection("label");
    console.log("connected");
    app.get("/user", async (req, res) => {
      const result = await userCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/userBin", async (req, res) => {
      const result = await userCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/labelUser", async (req, res) => {
      const result = await userCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/UserBinUpdate", async (req, res) => {
      const result = await userCollection.find({}).toArray();
      res.send(result);
    });
    // get by id
    app.get("/user/:_id", async (req, res) => {
      const _id = req.params._id;
      const query = { _id: ObjectId(_id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });
    app.post("/user", async (req, res) => {
      const userData = req.body;
      const result = await userCollection.insertOne(userData);

      res.send(result);
    });

    app.put("/user/:_id", async (req, res) => {
      const _id = req.params._id;

      const updateCalorie = req.body;

      const query = { _id: ObjectId(_id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: updateCalorie,
      };
      const result = await userCollection.updateOne(query, updatedDoc, options);
      res.send(result);
    });

    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);

      res.send(result);
    });
    app.delete("/label/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await labelCollection.deleteOne(query);

      res.send(result);
    });

    //label collection

    app.post("/label", async (req, res) => {
      const query = req.body;
      const result = await labelCollection.insertOne(query);
      res.send(result);
    });
    app.get("/label", async (req, res) => {
      const result = await labelCollection.find({}).toArray();
      res.send(result);
    });

    app.put("/labelUser/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);

      const UpdateUser = req.body.label;
      const filter = { _id: ObjectId(id) };
      const option = { upset: true };
      const updateDoc = {
        $set: {
          label: UpdateUser,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, option);
      res.send(result);
    });
    //bin udated
    app.put("/userBin/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);

      const UpdateUser = req.body.bin;

      const filter = { _id: ObjectId(id) };
      const option = { upset: true };
      const updateDoc = {
        $set: {
          bin: UpdateUser,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, option);
      res.send(result);
    });
    app.put("/userBinUpdate/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);

      const filter = { _id: ObjectId(id) };
      const option = { upset: true };
      const updateDoc = {
        $set: {
          bin: "",
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, option);
      res.send(result);
    });

    //update

    //console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
