const express = require('express');

const server = express();

// remember express by default cannot parse JSON in request bodies

server.use(express.json()); // express.json when invoked returns a middleware fn

// global middlewares and the user's router need to be connected here
const userRouter = require('./users/users-router');

//importing userRouter
// server.use("/api/users/", userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
