'use strict';

const Game = require('../model/game.js');
const storage = require('../lib/storage.js');

module.exports = function(router) {
  router.post('/api/games', function(req, res) {
    if(!req.body.title || !req.body.genre || !req.body.developer || !req.body.publisher || !req.body.platforms || !req.body.ratingESRB || !req.body.releaseDate) {
      res.statusCode = 400;
      res.end();
      return;
    }

    let game = new Game(req.body);

    storage.createItem('games', game)
    .then(game => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(game));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.statusCode = 500;
      res.end();
    });
  });

  router.get('/api/games', function(req, res) {
    let id = req.url.query.id;
    if(!id) {
      res.statusCode = 400;
      res.end();
      return;
    }

    storage.readItem('games', id)
    .then(game => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(game));
      res.end();
    })
    .catch(err => {
      res.statusCode = err.status;
      res.end();
    });
  });

  // router.delete('/api/games', function(req, res) {
  //
  // });
};
