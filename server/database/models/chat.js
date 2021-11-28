const { Schema, model } = require('mongoose');

const ChatModel = model('chats', new Schema({
  roomId: {
    type: Schema.Types.String,
    required: true,
  },
  userId: {
    type: Schema.Types.String,
    required: true,
  },
  message: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
  reply: {
    type: Schema.Types.String,
  },
}, {
  timestamps: true,
}));

module.exports = ChatModel;
