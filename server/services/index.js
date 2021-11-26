const userService = require('./user');
const contactService = require('./contact');

function service(io, socket) {
  userService(io, socket);
  contactService(io, socket);
}

module.exports = service;
