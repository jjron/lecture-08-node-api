'use strict';

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    if(req.method == 'POST' || req.method == 'PUT') {
      let bodyText = '';
      req.on('data', (buffer) => {
        bodyText += buffer.toString();
      });

      req.on('end', () => {
        try {
          let body = JSON.parse(bodyText);
          req.body = body;
          resolve(body);
        } catch(err) {
          err.status = 400; // bad request!
          reject(err);
        }
      });
    } else {
      resolve();
    }
  });
};
