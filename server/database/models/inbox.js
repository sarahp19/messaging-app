const { Schema, model } = require('mongoose');

const InboxModel = model('inboxs', new Schema({
  roomType: {
    type: Schema.Types.String,
    required: true,
    default: 'private',
  },
  roomId: {
    type: Schema.Types.String,
    required: true,
  },
  owners: {
    type: Schema.Types.Array,
  },
  to: {
    foreignId: {
      type: Schema.Types.String,
      required: true,
    },
    avatar: {
      type: Schema.Types.String,
    },
    profileName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
    },
  },
  lastMessage: {
    from: {
      type: Schema.Types.String,
      required: true,
    },
    condition: {
      type: Schema.Types.String,
      enum: ['notsend', 'sent', 'read'],
      default: 'sent',
    },
    text: {
      type: Schema.Types.String,
      trim: true,
    },
  },
}, {
  timestamps: true,
}));

module.exports = InboxModel;
