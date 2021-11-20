const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { UserModel, ProfileModel } = require('../database/models/user');
const response = require('../helpers/response');

exports.userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // password hash + gen salt 10
    const hashPass = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const user = await new UserModel({
      username,
      email,
      password: hashPass,
    }).save();

    const profile = await new ProfileModel({
      userId: user._id,
      profileName: username,
    }).save();

    // merge 2 responses
    const data = { ...user._doc, ...profile._doc };
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
}

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
        message: 'user with this username or email was not found',
      }
      throw newError;
    }

    // compare new password with hashed password
    const comparePass = await bcrypt.compare(password, user.password);
    // condition if user password is invalid
    if (!comparePass) {
      const newError = {
        message: 'password does not match',
      }
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
}

exports.userFindOne = async (req, res) => {
  try {
    // find user by _id
    const data = await UserModel.findOne({ _id: { $eq: req.user.userId } });

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
}
