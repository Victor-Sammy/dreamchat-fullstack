const asyncHandler = require('express-async-handler')

const ChatRoom = require('../models/chatRoomModel')
const User = require('../models/userModel')

const createRoom = asyncHandler(async (req, res) => {
  const { senderId, recipientEmail, text } = req.body
  try {
    const sender = await User.findById(senderId)

    const recipientUser = await User.findOne({
      email: `${recipientEmail}`,
    })

    if (!recipientUser) {
      res.status(404).json({ error: 'Recipient not found' })
      return
    }

    const newChat = new ChatRoom({
      from: sender,
      to: recipientEmail,
      text,
    })

    await newChat.save()
    res.status(201).send({ message: newChat })
    console.log(newChat)
  } catch (error) {
    res.status(500).json({ error: 'Chat initiation failed' })
  }
})

const getAllChatroomsById = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  try {
    const chatRooms = await ChatRoom.find({ from: userId }).populate('from')

    res.status(200).send(chatRooms)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chat rooms' })
  }
})

const getAllChatroomsByEmail = asyncHandler(async (req, res) => {
  const userEmail = req.params.userEmail
  try {
    const chatRooms = await ChatRoom.find({ to: userEmail }).populate('from')

    res.status(200).send(chatRooms)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chat rooms' })
  }
})

module.exports = {
  createRoom,
  getAllChatroomsByEmail,
  getAllChatroomsById,
}
