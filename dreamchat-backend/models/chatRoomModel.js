const mongoose = require('mongoose')

const chatRoomSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
  },
  to: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
  },
  text: { type: [String] },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Chatroom', chatRoomSchema)
