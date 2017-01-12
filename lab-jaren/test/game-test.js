'use strict';

const expect = require('chai').expect;
const Game = require('../model/game.js');

describe('testing game constructor', function() {
  it('should create a game object', function(done) {
    let data = {
      title: 'XCOM 2',
      genre: 'strategy/tactics',
      developer: '2K Games, Inc.',
      publisher: 'Firaxis Games, Inc.',
      platforms: 'Windows, Linux, Mac, PS4, Xbox One',
      ratingESRB: 'Teen',
      releaseDate: 'Feb 05, 2016',
    };

    let xcomTwo = new Game(data);
    expect(Boolean(xcomTwo.id)).to.equal(true);
    expect(xcomTwo).to.be.an.instanceof(Game);
    expect(xcomTwo.title).to.equal(data.title);
    expect(xcomTwo.genre).to.equal(data.genre);
    expect(xcomTwo.developer).to.equal(data.developer);
    expect(xcomTwo.publisher).to.equal(data.publisher);
    expect(xcomTwo.platforms).to.equal(data.platforms);
    expect(xcomTwo.ratingESRB).to.equal(data.ratingESRB);
    expect(xcomTwo.releaseDate).to.equal(data.releaseDate);
    done();
  });
});
