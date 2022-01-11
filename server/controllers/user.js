const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { UserModel, ProfileModel } = require('../database/models/user');
const mail = require('../helpers/mail');
const response = require('../helpers/response');

exports.userRegisterStep1 = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const byUsername = await UserModel.findOne({ username });
    const byEmail = await UserModel.findOne({ email });

    if (byUsername) {
      const newError = {
        message: 'Username has been used by another user',
      };
      throw newError;
    }

    if (byEmail) {
      const newError = {
        message: 'Email has been used by another user',
      };
      throw newError;
    }

    // password hash + gen salt
    const hashPass = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const key = Math.floor(1000 + Math.random() * 9000);

    mail({ key, email, username });

    response({
      res,
      data: {
        username,
        email,
        password: hashPass,
        key,
      },
    });
  }
  catch (error0) {
    response({
      success: false,
      res,
      statusCode: 400,
      message: error0.message,
    });
  }
};

exports.userRegisterStep2 = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await new UserModel({
      username,
      email,
      password,
    }).save();

    const profile = await new ProfileModel({
      userId: user._id,
      username,
      email,
      profileName: username,
    }).save();

    // merge 2 responses
    const data = { ...user, ...profile };
    response({ res, data });
  }
  catch (error0) {
    response({
      success: false,
      res,
      statusCode: 400,
      message: error0.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    // find user by username or email
    const user = await UserModel.findOne({
      $or: [
        { username: usernameOrEmail }, { email: usernameOrEmail },
      ],
    });

    // condition if user not found
    if (!user) {
      const newError = {
        message: 'User with this username or email was not found',
      };
      throw newError;
    }

    // compare new password with hashed password
    const comparePass = await bcrypt.compare(password, user.password);
    // condition if user password is invalid
    if (!comparePass) {
      const newError = {
        message: 'Password does not match',
      };
      throw newError;
    }

    // create new jwt tokens
    const data = await jwt.sign(
      { userId: user._id },
      process.env.JWT_PRIVATE_TOKEN,
    );

    response({ res, data });
  }
  catch (error0) {
    response({
      success: false,
      res,
      statusCode: 400,
      message: error0.message,
    });
  }
};

exports.userFind = async (req, res) => {
  try {
    let data;

    switch (Object.keys(req.query)[0]) {
      case 'init':
        data = await ProfileModel.findOne({
          userId: req.user.userId,
        });
        break;
      case 'profile': {
        const identifier = new RegExp(req.query.profile, 'gi');

        data = await ProfileModel.find({
          $or: [
            { username: { $regex: identifier } },
            { email: { $regex: identifier } },
          ],
        });
        break;
      }
      case 'id':
        data = await ProfileModel.findOne({
          userId: req.query.id,
        });
        break;
      default:
        data = await ProfileModel.find().sort({
          createdAt: -1,
        });
    }

    response({ res, data });
  }
  catch (error0) {
    response({
      success: false,
      res,
      statusCode: 400,
      message: error0.message,
    });
  }
};
