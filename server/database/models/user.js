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
    required: true,
  },
}));

exports.ProfileModel = model('profiles', new Schema({
  userId: {
    type: Schema.Types.String,
    required: true,
  },
  photo: {
    avatar: {
      type: Schema.Types.String,
      trim: true,
      default: 'defaultAvatar',
    },
    banner: {
      type: Schema.Types.String,
      trim: true,
      default: 'defaultBanner',
    },
  },
  profileName: {
    type: Schema.Types.String,
    trim: true,
    default: '',
  },
  bio: {
    type: Schema.Types.String,
    trim: true,
    maxlength: 200,
    default: '',
  },
  phone: {
    type: Schema.Types.Number,
    default: 0,
  },
  contacts: {
    type: Schema.Types.Array,
  },
  isActive: {
    type: Schema.Types.Boolean,
    default: false,
  },
}, {
  timestamps: true,
}));
