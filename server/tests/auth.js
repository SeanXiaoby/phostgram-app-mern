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
      username: "Max",
      password: "123456",
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
      session_id: "6451903ecc078c98c7273a9f",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// testLogin();
// testLogout();
