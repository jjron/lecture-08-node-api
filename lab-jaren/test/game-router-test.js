'use strict';

const expect = require('chai').expect;
const Game = require('../model/game.js');
const storage = require('../lib/storage.js');
const superagent = require('superagent');

const apiURL = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

describe('testing /api/games', function() {
  let mockData = {
    title: 'XCOM 2',
    genre: 'strategy/tactics',
    developer: '2K Games, Inc.',
    publisher: 'Firaxis Games, Inc.',
    platforms: 'Windows, Linux, Mac, PS4, Xbox One',
    ratingESRB: 'Teen',
    releaseDate: 'Feb 05, 2016',
  };
  describe('testing POST', function() {
    describe('with valid input', function() {
      after(done => {
        storage.deleteItem('games', this.toDelete)
        .then(() => done())
        .catch(done);
      });
      it('should return a game with status 200', done => {
        superagent.post(`${apiURL}/api/games`)
        .send(mockData)
        .then(res => {
          this.toDelete = res.body.id;
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('XCOM 2');
          expect(res.body.genre).to.equal('strategy/tactics');
          expect(res.body.developer).to.equal('2K Games, Inc.');
          expect(res.body.publisher).to.equal('Firaxis Games, Inc.');
          expect(res.body.platforms).to.equal('Windows, Linux, Mac, PS4, Xbox One');
          expect(res.body.ratingESRB).to.equal('Teen');
          expect(res.body.releaseDate).to.equal('Feb 05, 2016');
          expect(Boolean(res.body.id)).to.equal(true);
          done();
        })
        .catch(done);
      });
    });
    describe('with invalid body or no body provided', function(){
      it('should respond with status 400 bad request', done => {
        superagent.post(`${apiURL}/api/games`)
        .send({})
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('testing GET', function() {
    describe('with valid input', function() {
      before(done => {
        this.xcomTwo = new Game(mockData);
        storage.createItem('games', this.xcomTwo)
        .then(() => done())
        .catch(done);
      });
      after(done => {
        storage.deleteItem('games', this.xcomTwo.id)
        .then(() => done())
        .catch(done);
      });
      it('should return a game with status 200', done => {
        superagent.get(`${apiURL}/api/games?id=${this.xcomTwo.id}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('XCOM 2');
          expect(res.body.genre).to.equal('strategy/tactics');
          expect(res.body.developer).to.equal('2K Games, Inc.');
          expect(res.body.publisher).to.equal('Firaxis Games, Inc.');
          expect(res.body.platforms).to.equal('Windows, Linux, Mac, PS4, Xbox One');
          expect(res.body.ratingESRB).to.equal('Teen');
          expect(res.body.releaseDate).to.equal('Feb 05, 2016');
          expect(Boolean(res.body.id)).to.equal(true);
          done();
        })
        .catch(done);
      });
    });

    describe('with invalid input', function() {
      before(done => {
        this.xcomTwo = new Game(mockData);
        storage.createItem('games', this.xcomTwo)
        .then(() => done())
        .catch(done);
      });
      after(done => {
        storage.deleteItem('games', this.xcomTwo.id)
        .then(() => done())
        .catch(done);
      });
      it('no id provided should respond with status 400 bad request', done => {
        superagent.get(`${apiURL}/api/games?id=`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
      it('id not found should respond with status 404 not found', done => {
        superagent.get(`${apiURL}/api/games?id=42`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('testing DELETE', function() {
    describe('with valid input', function() {
      before(done => {
        this.xcomTwo = new Game(mockData);
        storage.createItem('games', this.xcomTwo)
        .then(() => done())
        .catch(done);
      });
      it('should delete item and respond with 204 no content', done => {
        superagent.delete(`${apiURL}/api/games?id=${this.xcomTwo.id}`)
        .then(res => {
          expect(res.statusCode).to.equal(204);
          done();
        })
        .catch(done);
      });
    });
    describe('with invalid input', function() {
      before(done => {
        this.xcomTwo = new Game(mockData);
        storage.createItem('games', this.xcomTwo)
        .then(() => done())
        .catch(done);
      });
      /* Actually delete after invalid delete tests */
      after(done => {
        storage.deleteItem('games', this.xcomTwo.id)
        .then(() => done())
        .catch(done);
      });
      it('no id provided should responde with status 400 bad request', done => {
        superagent.delete(`${apiURL}/api/games?id=`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
      it('id not found should respond with status 404 not found', done => {
        superagent.delete(`${apiURL}/api/games?id=42`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
  });
});
