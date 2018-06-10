const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const users = require('./users');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const SUPERSECRET = process.env.SUPERSECRET || 'supersecret';

const app = express();

const apiRoutes = express.Router();

// Use json decoder
app.use(express.json());
// Protect api with jwt token authentication
app.use(expressJwt({ secret: SUPERSECRET }).unless({ path: ['/api/signin'] }));

app.use('/api', apiRoutes);

// // Routes

// User signin
apiRoutes.post('/signin', (req, res) => {
  const user = users.getUser(req.body.email);
  // TODO: use a database and use the password hash instead
  if (!user || req.body.password !== user.password) {
    return res.status(401).json({ message: 'Invalid username or passowrd.' });
  }
  console.log(`User ${user.info.email} succesfully signed in`);
  // Returns user info and authentication token
  res.json({ token: jwt.sign(user.info, SUPERSECRET) });
});

// User profile
apiRoutes.get('/me', (req, res) => res.json(req.user));

// Video streaming mpd and chunks
apiRoutes.get('/stream/*', (req, res) => res.sendFile(req.params[0], { root: './stream' }));

// Run the server
console.log(`Server running at http://${HOST}:${PORT}`);

app.listen(PORT, HOST);
