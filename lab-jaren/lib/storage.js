'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const storage = module.exports = {};

const dataDir = `${__dirname}/../data`;

storage.createItem = function(name, item) {
  if (!(`${dataDir}/${name}`)) {
    fs.mkdirAsync(`${dataDir}/${name}`);
  }
  return fs.statAsync(`${dataDir}/${name}`)
  .catch(err => {
    err.status = 400;
    return Promise.reject(err);
  })
  .then(() => {
    let json = JSON.stringify(item);
    return fs.writeFileAsync(`${dataDir}/${name}/${item.id}.json`, json);
  })
  .then(() => Promise.resolve(item));
};

storage.readItem = function(name, id) {
  if (!(`${dataDir}/${name}`) || !(`${dataDir}/${name}/${id}`)) {
    let err = new Error('item not found');
    err.status = 404;
    return Promise.reject(err);
  }
  return fs.statAsync(`${dataDir}/${name}/${id}.json`)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.readFileAsync(`${dataDir}/${name}/${id}.json`);
  })
  .then(data => {
    return JSON.parse(data.toString());
  });
};

storage.deleteItem = function(name, id) {
  return fs.statAsync(`${dataDir}/${name}/${id}.json`)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    fs.unlinkAsync(`${dataDir}/${name}/${id}.json`);
    return Promise.resolve();
  });
};
