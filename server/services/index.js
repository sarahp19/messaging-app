const userService = require('./user');
const contactService = require('./contact');
const chatService = require('./chat');
const inboxService = require('./inbox');

let users = [];

function service(io, socket) {
  socket.on('user/connect', (args) => {
    try {
      const user = users.find((item) => item.userId === args.userId);
      if (user && user.socketId !== args.socketId) {
        const newError = {
          message: '',
        }
        throw newError;
      }

      users.push(args);
      socket.emit('user/connect/callback', {
        success: true,
      });
    }
    catch (error0) {
      socket.emit('user/connect/callback', {
        success: false,
      });
    }
  });

  userService(io, socket, users);
  contactService(io, socket, users);
  chatService(io, socket, users);
  inboxService(io, socket, users);

  socket.on('disconnect', () => {
    users = users.filter((item) => item.socketId !== socket.id);
  });
}

module.exports = service;
