// User signup/
const testSignup = () => {
  fetch("http://localhost:3001/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "SeanSheep",
      email: "boyangxi@usc.edu",
      password: "123456xby",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// User login/
const testLogin = () => {
  fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "123",
      password: "123",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// User logout/
const testLogout = () => {
  fetch("http://localhost:3001/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: "6451f24fccd75317a3f4873d",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// Find user by session id/
const testSessionFindUser = () => {
  fetch("http://localhost:3001/api/auth/session/6451f24fccd75317a3f4873d", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// testLogin();
// testLogout();
// testSessionFindUser();
