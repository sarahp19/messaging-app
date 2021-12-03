const ContactModel = require('../database/models/contact');

module.exports = (
  io,
  socket,
  users,
) => {
  socket.on('contact/add', async (args) => {
    const user = users.find((item) => item.socketId === args.socketId);

    try {
      await new ContactModel(args).save();

      const data = await ContactModel.find({
        ownerId: args.ownerId,
      }).sort({
        profileName: 1,
      });

      io.to(user.socketId).emit('contact/add/callback', {
        success: true,
        data,
        message: null,
      });
    }
    catch (error0) {
      io.to(user.socketId).emit('contact/add/callback', {
        success: false,
        data: null,
        message: error0.message,
      });
    }
  });

  socket.on('contact/get', async (args) => {
    const user = users.find((item) => item.socketId === args.socketId);

    try {
      const data = await ContactModel.find({
        ownerId: args.ownerId,
      }).sort({
        profileName: 1,
      });

      io.to(user.socketId).emit('contact/get/callback', {
        success: true,
        data,
        message: null,
      });
    }
    catch (error0) {
      io.to(user.socketId).emit('contact/get/callback', {
        success: false,
        data: null,
        message: error0.message,
      });
    }
  });
}
