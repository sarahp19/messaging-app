const ChatModel = require('../database/models/chat');
const InboxModel = require('../database/models/inbox');

module.exports = (io, socket, users) => {
  socket.on('chat/get', async (args) => {
    const user = users.find((item) => item.socketId === args.socketId);

    try {
      const data = await ChatModel.find({
        roomId: args.roomId,
      });

      io.to(user.socketId).emit('chat/get/callback', {
        success: true,
        data,
        message: null,
      });
    }
    catch (error0) {
      io.to(user.socketId).emit('chat/get/callback', {
        success: false,
        data: null,
        message: error0.message,
      });
    }
  });

  socket.on('chat/add', async (args) => {
    try {
      const inbox = await InboxModel.findOne({
        roomId: args.roomId,
      });

      if (inbox) {
        await InboxModel.findOneAndUpdate({
          roomId: args.roomId,
        }, {
          $set: {
            lastMessage: {
              from: args.from.userId,
              text: args.message,
            },
          },
        });
      } else {
        await new InboxModel({
          roomId: args.roomId,
          owners: [args.from, args.to],
          to: {
            foreignId: args.to.userId,
            avatar: args.to.avatar,
            profileName: args.to.profileName,
            username: args.to.username,
          },
          lastMessage: {
            from: args.from.userId,
            text: args.message,
          },
        }).save()._doc;
      }

      await new ChatModel({
        roomId: args.roomId,
        userId: args.from.userId,
        message: args.message,
        reply: args.reply,
      }).save();

      const data = await ChatModel.find({
        roomId: args.roomId,
      });

      io.emit('chat/get/callback', {
        success: true,
        data,
        message: null,
      });

      const inboxData = await InboxModel.find({
        owners: {
          $elemMatch: {
            userId: args.from.userId,
          },
        },
      }).sort({ updatedAt: -1 });

      io.emit('inbox/get/callback', {
        success: true,
        data: inboxData,
        message: null,
      });
    }
    catch (error0) {
      io.emit('chat/get/callback', {
        success: false,
        data: null,
        message: error0.message,
      });
    }
  });
}
