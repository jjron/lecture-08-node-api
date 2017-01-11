'use strict';

const url = require('url');
const querystring = require('querystring');
const parseBody = require('../lib/parse-body.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);

    parseBody(req)
    .then(() => {
      let callback = this.routes[req.method][req.url.pathname];
      if(typeof callback == 'function') {
        callback(req, res);
        return;
      }

      let err = new Error('route not found');
      err.status = 404;
      return Promise.reject(err);
    })
    .catch(err => {
      console.error(err);
      if(err.status) {
        res.statusCode = err.status;
        res.end();
        return;
      }
      res.statusCode = 500; // internal server error!
      res.end();
    });
  };
};
