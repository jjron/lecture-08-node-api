'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

//const data = {};
const storage = module.exports = {};

const dataDir = `${__dirname}/../data`;

storage.createItem = function(name, item) {
  // TODONE: check if directory exists
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
    // TODONE: save the item in the directory
    return fs.writeFileAsync(`${dataDir}/${name}/${item.id}.json`, json);
  })
  // TODONE: respond to the user
  .then(() => Promise.resolve(item));
};

storage.readItem = function(name, id) {
  // if (!data[name] || !data[name][id]) {
  //   let err = new Error('item not found');
  //   err.status = 404;
  //   return Promise.reject(err);
  // }
  // return Promise.resolve(data[name][id]);
  // TODONE: check if name dir exists if not 404
  // TODONE: check if JSON file with id name exists if not 404
  // TODONE: read json file parse and send back
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
  // if (!data[name] || !data[name][id]) {
  //   let err = new Error('item not found');
  //   err.status = 404;
  //   return Promise.reject(err);
  // }
  // delete data[name][id];
  // return Promise.resolve();
  // TODO: use fs.statAsync to check if file exists
  // if not in catch block make the error a 404 and reject it
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
