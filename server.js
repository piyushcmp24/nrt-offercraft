const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'my-secret-key';
const expiresIn = '1h';

// Read users from db.json
const getUsersDb = () => {
  return JSON.parse(fs.readFileSync('./db.json', 'UTF-8')).users;
};

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if user exists
function isAuthenticated({ email, password }) {
  return (
    getUsersDb().findIndex(user => user.email === email && user.password === password) !== -1
  );
}

// Setup middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Login endpoint
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = getUsersDb();

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    res.status(401).json({ message: 'Incorrect email or password' });
    return;
  }

  const token = createToken({ email, role: user.role });
  res.status(200).json({ token });
});

// Use default router
server.use(router);

// Start server
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
