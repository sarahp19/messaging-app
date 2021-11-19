const { Schema, model } = require('mongoose');

const InboxModel = model('inboxs', new Schema({
  roomType: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  owners: {
    type: Schema.Types.Array,
  },
  from: {
    type: Schema.Types.String,
    required: true,
  },
  lastMessage: {
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
