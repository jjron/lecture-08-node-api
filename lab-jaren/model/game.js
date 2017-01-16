'use strict';

const uuid = require('node-uuid');

module.exports = function(obj){
  this.id = uuid.v1();
  this.title = obj.title;
  this.genre = obj.genre;
  this.developer = obj.developer;
  this.publisher = obj.publisher;
  this.platforms = obj.platforms;
  this.ratingESRB = obj.ratingESRB;
  this.releaseDate = obj.releaseDate;
};
