const express = require("express");
const cors = require("cors");
const db = require("./models/db.js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const PORT = 3001;

app.use(express.static("public"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/ping", async (req, res, next) => {
  res.status(204).send();
  return next();
});

// Authentication APIs
app.post("/api/auth/login", async (req, res, next) => {
  // Login API
  const info = req.body;

  if (info === undefined || info === null) {
    res.status(400).json({ error: { message: "Empty body" } });
    return next();
  } else if (info.username === undefined || info.password === undefined) {
    res.status(400).json({ error: { message: "Empty body" } });
    return next();
  }

  if ((await db.findUserName(info.username)) === null) {
    res
      .status(404)
      .json({ error: { message: "username error" }, field: "username" });
    return next();
  } else if (
    (await db.authenticateUser(info.username, info.password)) === null
  ) {
    res
      .status(404)
      .json({ error: { message: "password error" }, field: "password" });
    return next();
  }

  const previous_session_id = await db.sessionIsAlreadyLogin(
    await db.findUserName(info.username)
  );

  if (previous_session_id !== null) {
    res.status(409).json({
      error: { message: "already logged in" },
      session_id: previous_session_id,
    });
    return next();
  }

  const session_id = await db.sessionLogin(
    await db.findUserName(info.username)
  );

  if (session_id === null) {
    res.status(401).json({ error: { message: "login failed" } });
    return next();
  }

  res.status(200).json({ session_id: session_id });
  return next();
});

app.post("/api/auth/register", async (req, res, next) => {
  // Register API
  const info = req.body;
  const required_keys = ["email", "username", "password"];

  if (info === undefined || info === null) {
    res.status(400).json({ error: { message: "Empty body" } });
    return next();
  }

  for (const key of required_keys) {
    if (info[key] === undefined) {
      res.status(400).json({ error: { message: "empty fields" }, field: key });
      return next();
    }
  }

  if ((await db.findUserName(info.username)) !== null) {
    res.status(409).json({
      error: { message: "username already exists" },
      field: "username",
    });
    return next();
  } else if ((await db.findUserEmail(info.email)) !== null) {
    res.status(409).json({
      error: { message: "username already exists" },
      field: "email",
    });
    return next();
  }

  const user_id = await db.insertUser(info.username, info.password, info.email);
  if (user_id === null) {
    res
      .status(401)
      .json({ user_id: null, error: { message: "Register failed" } });
    return next();
  }

  res.status(200).json({ user_id: user_id });
  next();
});

app.post("/api/auth/logout", async (req, res, next) => {
  // Logout API
  const info = req.body;

  if (info === undefined || info === null) {
    res.status(400).json({ error: { message: "Empty body" } });
    return next();
  } else if (info.session_id === undefined) {
    res.status(400).json({ error: { message: "Empty session" } });
    return next();
  }

  const user_id = await db.sessionLogout(info.session_id);

  if (user_id === null) {
    res.status(401).json({ error: { message: "logout failed" } });
    return next();
  }

  res.status(200).json({ user_id: user_id });
  next();
});

app.use((req, res, next) => {
  console.log(
    `Request received: ${req.method} ${
      req.url
    } @ ${new Date().toLocaleTimeString()}`
  );
  next();
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
