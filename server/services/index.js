const userService = require('./user');
const contactService = require('./contact');
const chatService = require('./chat');
const inboxService = require('./inbox');

const users = [];

function service(io, socket) {
  socket.on('user/connected', (args) => {
    users.push(args);
  });

  userService(io, socket, users);
  contactService(io, socket, users);
  chatService(io, socket, users);
  inboxService(io, socket, users);
}

module.exports = service;
