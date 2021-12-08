const InboxModel = require('../database/models/inbox');

module.exports = (
  io,
  socket,
  users,
) => {
  socket.on('inbox/get', async (args) => {
    const user = users.find((item) => item.socketId === args.socketId);

    try {
      const data = await InboxModel.find({
        owners: {
          $elemMatch: {
            userId: args.userId,
          },
        },
      }).sort({ updatedAt: -1 });

      io.to(user.socketId).emit('inbox/get/callback', {
        success: true,
        data,
        message: null,
      });
    }
    catch (error0) {
      io.to(user.socketId).emit('inbox/get/callback', {
        success: false,
        data: null,
        message: error0.message,
      });
    }
  });

  socket.on('inbox/update/archived', async (args) => {
    try {
      await InboxModel.updateMany(
        { roomId: { $in: args.data } },
        {
          $set: {
            archived: args.active,
          },
        },
      );

      const data = await InboxModel.find({
        owners: {
          $elemMatch: {
            userId: args.userId,
          },
        },
      }).sort({ updatedAt: -1 });

      socket.emit('inbox/get/callback', {
        success: false,
        data,
        message: null,
        sound: false,
      });
    }
    catch (error0) {
      socket.emit('inbox/get/callback', {
        success: false,
        data: null,
        message: error0.message,
        sound: false,
      });
    }
  });
}
