const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const request = require('request');

const streams = require('./streams');
const users = require('./users');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const SUPERSECRET = process.env.SUPERSECRET || 'supersecret';
const LIVESTREAM_URL = process.env.LIVESTREAM_URL || 'http://live-streaming-demo-encoder';

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
  console.log(`User ${user.info.id} succesfully signed in`);
  // Returns user info and authentication token
  res.json({ token: jwt.sign(user.info, SUPERSECRET) });
});

// User profile
apiRoutes.get('/me', (req, res) => res.json(req.user));

// Get authrorization for watching the stream
apiRoutes.post('/start-stream', (req, res) => {
  // Try to acquire a free slot
  streams.lockSlot(req.user.id)
    .then(({ key, token }) => res.json({
      token: jwt.sign({ key, token }, SUPERSECRET),
      streamUrl: '/api/stream/stream.mpd',
    }))
    .catch(e => {
      // TODO: handle other exceptions
      console.log('Error trying to acquire lock', e);
      return res.status(403).send({ message: 'Reached maximum number of simultaneous streams' });
    })
});

// Video streaming mpd and chunks
apiRoutes.get('/stream/*', (req, res) => {
  // Stream authorization token not found
  if(!req.headers['x-stream-auth']) {
    return res.status(401).send({ message: 'Stream authorization header not found'})
  }
  // TODO: catch errors here
  let { token, key } = jwt.verify(req.headers['x-stream-auth'], SUPERSECRET);
  streams.verifyAndExtendSlotLock(key, token)
    // Token authorized -> return stream chunk
    .then(() => request(`${LIVESTREAM_URL}/${req.params[0]}`).pipe(res))
    // Stream authorization token invalid or expired
    .catch(e => {
      console.log('Invalid or expired stream authorization token', e);
      return res.status(401).send({ message: 'Invalid stream authorization token'});
    });
  });

// Run the server
console.log(`Server running at http://${HOST}:${PORT}`);

app.listen(PORT, HOST);
