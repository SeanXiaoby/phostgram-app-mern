const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");
const dotenv = require("dotenv");

class dbAPI {
  constructor() {
    dotenv.config();
    // let uri =
    //   process.env.mongoSource === "atlas"
    //     ? process.env.atlas_mongoURI
    //     : process.env.local_mongoURI;
    const uri =
      "mongodb+srv://boyangxiao:1998629@cluster0.lfbgty1.mongodb.net/?retryWrites=true&w=majority&useUnifiedTopology=true";
    console.log(process.env.mongoSource);
    this._client = new MongoClient(uri);
  }

  async connectDB() {
    try {
      await this._client.connect();
      await this._client.db("ee547_final").command({ ping: 1 });
    } catch (err) {
      throw err;
    }

    this._db = this._client.db("ee547_final");
    this._users = this._db.collection("users");
    this._log = this._db.collection("log");
    this._phosts = this._db.collection("phosts");
    this._session = this._db.collection("session");
  }
  

  async findUser(username) {
    const user = await this._users.findOne({ username });
    if (user !== null) {
      return user._id.toString();
    }
    return user;
  }

  async authenticateUser(username, password) {
    const user = await this._users.findOne({ username, password });
    return user;
  }

  async insertUser(info) {
    const { insertedId: mid } = await this._users.insertOne({
      username: "Sean",
      password: "123456",
    });
    console.log(mid.toString());

    const user = await this._users.findOne({ username: "Sean1" });

    // console.log(user);

    return mid.toString();
  }


}

const db = new dbAPI();
module.exports = db;
