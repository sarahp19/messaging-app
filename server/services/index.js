const userService = require('./user');
const contactService = require('./contact');
const chatService = require('./chat');
const inboxService = require('./inbox');

let users = [];

function service(io, socket) {
  socket.on('user/connect', (args) => {
    users.push(args);

    userService(io, socket, users);
    contactService(io, socket, users);
    chatService(io, socket, users);
    inboxService(io, socket, users);

    socket.emit('user/connect/callback', {
      success: true,
    });
  });

  socket.on('disconnect', () => {
    users = users.filter((item) => item.socketId !== socket.id);
  });
}

module.exports = service;
