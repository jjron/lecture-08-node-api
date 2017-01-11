'use strict';

const data = {};
const storage = module.exports = {};

storage.createItem = function(name, item) {
  if (!data[name])
    data[name] = {};
  data[name][item.id] = item;
  return Promise.resolve(item);
};

storage.readItem = function(name, id) {
  if (!data[name] || !data[name][id]) {
    let err = new Error('item not found');
    err.status = 404;
    return Promise.reject(err);
  }
  return Promise.resolve(data[name][id]);
};

storage.deleteItem = function(name, id) {
  if (!data[name] || !data[name][id]) {
    let err = new Error('item not found');
    err.status = 404;
    return Promise.reject(err);
  }
  delete data[name][id];
  return Promise.resolve();
};
