const userService = require('./user');
const contactService = require('./contact');
const chatService = require('./chat');
const inboxService = require('./inbox');

function service(io, socket) {
  userService(io, socket);
  contactService(io, socket);
  chatService(io, socket);
  inboxService(io, socket);
}

module.exports = service;
