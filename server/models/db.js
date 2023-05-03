const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");
const dotenv = require("dotenv");

class dbAPI {
  constructor() {
    dotenv.config();
    let uri =
      process.env.mongoSource === "atlas"
        ? process.env.atlas_mongoURI
        : process.env.local_mongoURI;
    // const uri =
    //   "mongodb+srv://boyangxiao:1998629@cluster0.lfbgty1.mongodb.net/?retryWrites=true&w=majority&useUnifiedTopology=true";
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

  async findUserId(user_id) {
    const user = await this._users.findOne({ _id: new ObjectId(user_id) });
    if (user === null) {
      return null;
    }
    const { _id, ...res } = user;
    res.id = _id.toString();
    return res;
  }

  async findUserName(username) {
    const user = await this._users.findOne({ username });
    if (user !== null) {
      return user._id.toString();
    }
    return null;
  }

  async findUserEmail(email) {
    const user = await this._users.findOne({ email });
    if (user !== null) {
      return user._id.toString();
    }
    return null;
  }

  async authenticateUser(username, password) {
    const user = await this._users.findOne({ username });

    if (user === null) return null;

    if (user.password === password) {
      return user._id.toString();
    }

    return null;
  }

  async sessionIsAlreadyLogin(user_id) {
    const session = await this._session.findOne({
      user_id: new ObjectId(user_id),
    });
    if (session === null) return null;
    return session._id.toString();
  }

  async sessionLogin(user_id) {
    if ((await this.findUserId(user_id)) === null) return null;

    const { insertedId: mid } = await this._session.insertOne({
      user_id: new ObjectId(user_id),
      login_time: new Date().toISOString(),
    });

    if (mid !== null && mid !== undefined) {
      return mid.toString();
    } else {
      return null;
    }
  }

  async sessionLogout(session_id) {
    if (!ObjectId.isValid(session_id)) {
      return null;
    }

    const session = await this._session.findOne({
      _id: new ObjectId(session_id),
    });

    if (session === null) return null;

    const { deletedCount } = await this._session.deleteOne({
      _id: new ObjectId(session_id),
    });

    if (deletedCount === 1) {
      return session.user_id.toString();
    } else {
      return null;
    }
  }

  async sessionFindUser(session_id) {
    if (!ObjectId.isValid(session_id)) {
      return null;
    }

    const session = await this._session.findOne({
      _id: new ObjectId(session_id),
    });

    if (session === null) return null;

    return session.user_id.toString();
  }

  async insertUser(username, password, email, avatar = null) {
    const { insertedId: mid } = await this._users.insertOne({
      username,
      password,
      email,
      avatar,
      created_at: new Date().toISOString(),
      phosts: [],
    });
    if (mid === null) return null;
    return mid.toString();
  }
}

const db = new dbAPI();
module.exports = db;
