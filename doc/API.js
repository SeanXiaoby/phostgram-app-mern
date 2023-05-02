const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

// Data Schemas
const User = {
  id: 'String!',
  username: 'String!',
  email: 'String!',
  avatar: 'String',
  phost: '[phost]!',
};

const Author = {
  id: 'String!',
  username: 'String!',
};

const Phost = {
  id: 'String!',
  author: '<Author>!',
  img: 'String!',
  text: 'String!',
  created_at: 'ISOstring!',
  comments: '[Comment]!',
};

const Comment = {
  id: 'String!',
  author: '<Author>!',
  text: 'String!',
};

const Error = {
  message: 'string',
};

// Mock user data
const users = [
    {
      id: 1,
      username: 'BoyangXiao',
      password: 'password123',
      email: 'sean@123.com',
    },
    {
      id: 2,
      username: 'YuanfengLi',
      password: 'password456',
      email: 'ryan@123.com',
    },
  ];

// Authentication APIs
app.post('/api/auth/login', (req, res) => {
  // Login API
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ token: null, error: { message: 'Invalid username or password' } });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

  res.status(200).json({ token });
});

app.post('/api/auth/register', (req, res) => {
  // Register API
});

app.post('/api/auth/logout', (req, res) => {
  // Logout API
});

// Phost APIs
app.get('/api/phost', (req, res) => {
  // Get all phosts API
});

app.get('/api/phost/:id', (req, res) => {
  // Get a certain phost with its id API
});

app.post('/api/phost', (req, res) => {
  // Create a new phost API
});

app.post('/api/comment', (req, res) => {
  // Create a new comment API
});

app.put('/api/phost/:id', (req, res) => {
  // Update a certain phost with its id API
});

// User APIs
app.get('/api/user/:id', (req, res) => {
  // Get a certain user with its id API
});

app.post('/api/user', (req, res) => {
  // Create a new user API
});

app.put('/api/user/:id', (req, res) => {
  // Update a certain user with its id API
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
