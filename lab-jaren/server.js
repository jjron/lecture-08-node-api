'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const Router = require('./lib/router.js');
const gameRouter = require('./lib/game-router.js');

let router = new Router();

gameRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up on port', PORT);
});
