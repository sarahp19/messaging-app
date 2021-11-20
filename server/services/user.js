const jwt = require('jsonwebtoken');
const { UserModel, ProfileModel } = require('../database/models/user');

module.exports = (io, socket) => {
  socket.on('user/findOne', async (args) => {
    try {
      const request = await jwt.verify(args.token, process.env.JWT_PRIVATE_TOKEN);

      const user = await UserModel.findOne({ _id: request.userId });
      const profile = await ProfileModel.findOne({ userId: user._id });

      io.emit('user/findOne/callback', {
        success: true,
        data: { user, profile },
        message: null,
      });
    }
    catch (error0) {
      io.emit('user/findOne/callback', {
        success: false,
        data: null,
        message: error0.message,
      });
    }
  });

  socket.on('user/update', async (args) => {
    try {
      await ProfileModel.findOneAndUpdate({ userId: args._id }, {
        $set: {
          profileName: args.profileName,
          bio: args.bio,
          phone: args.phone,
          photo: {
            banner: args.banner,
            avatar: args.avatar,
          },
        },
      });

      const user = await UserModel.findOne({ _id: args._id });
      const profile = await ProfileModel.findOne({ userEmail: args._id });

      io.emit('user/update/callback', {
        success: true,
        data: { user, profile },
      });
    }
    catch (error0) {
      io.emit('user/update/callback', {
        success: false,
        message: error0.message,
      });
    }
  });
}
