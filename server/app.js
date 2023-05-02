const express = require("express");
const db = require("./models/db.js");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const app = express();
const PORT = 3001;

app.get("/ping", async (req, res, next) => {
  res.status(204).send();
});

app.get("/user", async (req, res, next) => {
  const info = req.body;
  const user_id = await db.insertUser(info);

  res.status(200).send(user_id);
});
// Initiate the server

// Authentication APIs
app.post('/api/auth/login', async (req, res, next) => {
  // Login API
  const info = req.body;
  if (info.username === null) {
    return res.status(401).json({ token: null, error: { message: 'Please enter username' } });
  }
  if (info.password === null) {
    return res.status(401).json({ token: null, error: { message: 'Please enter password' } });
  }
  const ret = await db.findUser(info.username);
  if (ret === null) {
    return res.status(401).json({ token: null, error: { message: 'Invalid username or password' } });
  }
  return res.status(200).json({ token: ret._id });
  // // Generate a JWT token
  // const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

  // res.status(200).json({ token });
});

app.post('/api/auth/register', async (req, res, next) => {
  // Register API
  const info = req.body;
  if (info.username === null) {
    return res.status(401).json({ token: null, error: { message: 'Please enter username' } });
  }
  if (info.password === null) {
    return res.status(401).json({ token: null, error: { message: 'Please enter password' } });
  }
  if (info.email === null) {
    return res.status(401).json({ token: null, error: { message: 'Please enter email' } });
  }
  const ret = await db.registerUser(info.email, info.username, info.password);
  if (ret === null) {
    return res.status(401).json({ token: null, error: { message: 'Register failed' } });
  }
  return res.status(200).json({ token: ret._id });
});

app.post('/api/auth/logout', async (req, res, next) => {
  // Logout API
  const ret = await db.registerUser(info.username);
  if (ret === null) {
    return res.status(401).json({ error: { message: 'Logout failed'} });
  }
  return res.status(200).json();
});

(async () => {
  console.log("Service is initialized!");
  console.log("Waiting for connecting to MongoDB...");

  try {
    await db.connectDB();
  } catch (err) {
    console.log(err);
    process.exit(5);
  }

  console.log("MongoDB is sucessfully connected!");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
})();
