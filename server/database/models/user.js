const { Schema, model } = require('mongoose');

exports.UserModel = model('users', new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
  },
}));

exports.ProfileModel = model('profiles', new Schema({
  userEmail: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  photo: {
    avatar: {
      type: Schema.Types.String,
      trim: true,
      default: 'default-avatar.png',
    },
    banner: {
      type: Schema.Types.String,
      trim: true,
      default: 'default-banner.png',
    },
  },
  profileName: {
    type: Schema.Types.String,
    trim: true,
  },
  bio: {
    type: Schema.Types.String,
    trim: true,
    maxlength: 200,
  },
  isActive: {
    type: Schema.Types.Boolean,
    default: false,
  },
}, {
  timestamps: true,
}));
