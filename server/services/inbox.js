const InboxModel = require('../database/models/inbox');

module.exports = (io, socket) => {
  socket.on('inbox/get', async (args) => {
    try {
      const data = await InboxModel.find({
        userId: args.userId,
      });

      io.emit('inbox/get/callback', {
        success: true,
        data,
        message: null,
      });
    }
    catch (error0) {
      io.emit('inbox/get/callback', {
        success: false,
        data: null,
        message: error0.message,
      });
    }
  });
}
