const express = require("express");
const db = require("./models/db.js");

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
