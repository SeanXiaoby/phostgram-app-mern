const express = require("express");
const cors = require("cors");
const db = require("./models/db.js");
const { cloudinary } = require("./utils/cloudinary.js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const PORT = 3001;

app.use(express.static("public"));

// Body parser middleware
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());

app.get("/ping", async (req, res, next) => {
  res.status(204).send();
  return next();
});

app.post("/api/uploadImg", async (req, res, next) => {
  try {
    const fileStr = req.body.data;

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "phostgram",
    });

    res.status(200).json({ img_url: uploadResponse.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: "server error" } });
    return next();
  }
  next();
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

app.get("/api/auth/session/:id", async (req, res, next) => {
  const session_id = req.params.id;

  if (session_id === undefined || session_id === null) {
    res.status(400).json({ error: { message: "Empty session" } });
    return next();
  }

  const user_id = await db.sessionFindUser(session_id);

  if (user_id === null) {
    res.status(404).json({ error: { message: "session not found" } });
    return next();
  } else {
    res.status(200).json({ user_id: user_id });
    return next();
  }
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

// Phost APIs
app.get("/api/phost", async (req, res, next) => {
  // Get all phosts API
  const ret = await db.getAllPhosts();
  if (ret === null) {
    res
      .status(401)
      .json({ error: { message: "Can not get all phosts from server" } });
    return next();
  }
  res.status(200).json(
    // ret.map((phost) => {
    //   return {
    //     id: phost.id,
    //   };
    // })
    { phosts: ret }
  );
  return next();
});

app.get("/api/phost/:id", async (req, res, next) => {
  // Get a certain phost with its id API
  const info = req.params;
  if (info === undefined || info === null) {
    res.status(401).json({ error: { message: "Empty body" } });
    return next();
  } else if (info.id === undefined || info.id === null) {
    res.status(401).json({ error: { message: "Invalid phost ID" } });
    return next();
  }
  const ret = await db.getPhost(info.id);
  if (ret === null) {
    res.status(404).json({
      phost: null,
      error: { message: "Can not find the phost from server" },
    });
    return next();
  }
  res.status(200).json({ phost: ret });
  return next();
});

app.post("/api/phost", async (req, res, next) => {
  // Create a new phost API
  const info = req.body;
  console.log(info);
  if (info === undefined || info === null) {
    res.status(400).json({ error: { message: "Empty body" } });
    return next();
  } else if (info.author_id === undefined || info.author_id === null) {
    res.status(400).json({ error: { message: "Invalid author ID" } });
    return next();
  } else if (info.img === undefined) {
    res.status(400).json({ error: { message: "Invalid image" } });
    return next();
  } else if (info.text === undefined || info.text === null) {
    res.status(400).json({ error: { message: "Invalid text" } });
    return next();
  }
  const ret = await db.insertPhost(info);
  if (ret === null) {
    res
      .status(404)
      .json({ id: null, error: { message: "Create phosst failed" } });
    return next();
  }
  const update_ret = await db.UpdateUserPhosts(info.author_id, ret);
  if (update_ret === null) {
    res
      .status(404)
      .json({ id: null, error: { message: "updateUserPhosts failed" } });
    return next();
  }
  res.status(200).json({ phost_id: ret });
  return next();
});

app.get("/api/user/:id/", async (req, res, next) => {
  // Return user's all info.
  // Body empty
  const id = req.params.id;
  console.log(id);
  if (id === undefined || id === null) {
    res.status(400).json({ error: { message: "Invalid ID!" } });
    return next();
  }
  const ret = await db.findUserId(id);
  if (ret === null) {
    res.status(401).json({ error: { message: "Get user info failed!" } });
    return next();
  }

  res.status(200).json(ret);
  return next();
});

app.get("/api/user/:id/phosts", async (req, res, next) => {
  // Body empty
  const id = req.params.id;
  console.log(id);
  if (id === undefined || id === null) {
    res.status(400).json({ error: { message: "Invalid ID!" } });
    return next();
  }
  const ret = await db.getPhostsByUserId(id);
  if (ret === null) {
    res.status(401).json({ error: { message: "Get user info failed!" } });
    return next();
  }

  res.status(200).json(ret);
  return next();
});

app.post("/api/comment", (req, res) => {
  // Create a new comment API
});

app.put("/api/phost/:id", (req, res) => {
  // Update a certain phost with its id API
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
