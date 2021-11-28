const ChatModel = require('../database/models/chat');
const InboxModel = require('../database/models/inbox');

module.exports = (io, socket) => {
  socket.on('chat/get', async (args) => {
    try {
      const data = await ChatModel.find({
        roomId: args.roomId,
      });

      io.emit('chat/get/callback', {
        success: true,
        data,
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
              from: args.userId,
              text: args.message,
            },
          },
        });
      } else {
        await new InboxModel({
          roomId: args.roomId,
          userId: args.userId,
          to: {
            foreignId: args.to.foreignId,
            avatar: args.to.avatar,
            profileName: args.to.profileName,
            username: args.to.username,
          },
          lastMessage: {
            from: args.userId,
            text: args.message,
          },
        }).save();
      }

      await new ChatModel({
        roomId: args.roomId,
        userId: args.userId,
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
