const ChatModel = require('../database/models/chat');
const InboxModel = require('../database/models/inbox');

module.exports = (
  io,
  socket,
  users,
) => {
  socket.on('chat/get', async (args) => {
    const user = users.find((item) => item.socketId === args.socketId);

    try {
      const inbox = await InboxModel.findOne({
        $and: [
          { owners: { $elemMatch: { userId: args.userId } } },
          { owners: { $elemMatch: { userId: args.foreignId } } },
        ],
      });

      const data = await ChatModel.find({ roomId: inbox.roomId });

      io
        .to(user.socketId)
        .emit('chat/get/callback', {
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
    const user = users.find((item) => item.socketId === args.socketId);

    try {
      const inbox = await InboxModel.findOne({ roomId: args.roomId });
      const foreign = users.find((item) => item.userId === args.to.userId)

      const chat = await new ChatModel({
        roomId: args.roomId,
        userId: args.from.userId,
        message: args.message,
        reply: args.reply,
      }).save();

      if (inbox) {
        await InboxModel.findOneAndUpdate({
          roomId: args.roomId,
        }, {
          $set: {
            lastMessage: {
              from: args.from.userId,
              text: args.message,
              createdAt: chat.createdAt,
            },
          },
          $inc: { total: 1 },
        });
      } else {
        await new InboxModel({
          roomId: args.roomId,
          owners: [args.from, args.to],
          lastMessage: {
            from: args.from.userId,
            text: args.message,
            createdAt: chat.createdAt,
          },
          total: 1,
        }).save()._doc;
      }

      const data = await ChatModel.find({ roomId: args.roomId });
      const inboxData = await InboxModel.find({
        owners: {
          $elemMatch: {
            userId: args.from.userId,
          },
        },
      }).sort({ updatedAt: -1 });

      io
        .to(user.socketId)
        .emit('chat/get/callback', {
          success: true,
          data,
          message: null,
        });

      io
        .to(user.socketId)
        .emit('inbox/get/callback', {
          success: true,
          data: inboxData,
          message: null,
        });

      if (foreign) {
        io
          .to(foreign.socketId)
          .emit('chat/get/callback', {
            success: true,
            data,
            message: null,
          });

        const inboxDataForeign = await InboxModel.find({
          owners: {
            $elemMatch: {
              userId: args.to.userId,
            },
          },
        }).sort({ updatedAt: -1 });

        io
          .to(foreign.socketId)
          .emit('inbox/get/callback', {
            success: true,
            data: inboxDataForeign,
            message: null,
            sound: true,
          });
      }
    }
    catch (error0) {
      io.to(user.socketId).emit('chat/add/callback', {
        success: false,
        data: null,
        message: error0.message,
      });
    }
  });

  socket.on('chat/read', async (args) => {
    try {
      await InboxModel.findOneAndUpdate(
        { roomId: args.roomId },
        {
          $set: {
            'lastMessage.condition': 'read',
            total: 0,
          },
        },
      );

      const foreign = users.find((item) => item.userId === args.foreignId);

      await ChatModel.updateMany(
        { condition: 'sent' },
        { $set: { condition: 'read' } },
      );

      const chat = await ChatModel.find({ roomId: args.roomId });
      const inboxForeign = await InboxModel.find({
        owners: {
          $elemMatch: {
            userId: args.foreignId,
          },
        },
      }).sort({ updatedAt: -1 });

      const inboxUser = await InboxModel.find({
        owners: {
          $elemMatch: {
            userId: args.userId,
          },
        },
      }).sort({ updatedAt: -1 });

      io.to(foreign.socketId).emit('chat/get/callback', {
        success: true,
        data: chat,
        message: null,
      });

      io.to(foreign.socketId).emit('inbox/get/callback', {
        success: true,
        data: inboxForeign,
        message: null,
      });

      socket.emit('inbox/get/callback', {
        success: true,
        data: inboxUser,
        message: null,
      });
    }
    catch (error0) {
      socket.emit('chat/read/callback', {
        success: false,
        data: null,
        message: error0.message,
      });
    }
  });
}
