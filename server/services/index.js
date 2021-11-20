const userService = require('./user');

function service(io, socket) {
  userService(io, socket);
}

module.exports = service;
