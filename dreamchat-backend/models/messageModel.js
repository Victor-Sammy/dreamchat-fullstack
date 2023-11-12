const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom',
  },
  from: {
    type: String,
    ref: 'User',
  },
  to: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
  },
  text: String,
  image: { type: [String] },
  video: { type: [String] },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Message', messageSchema)
