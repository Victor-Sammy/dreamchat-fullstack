const express = require('express')
const {
  createRoom,
  getAllChatroomsById,
  getAllChatroomsByEmail,
} = require('../controllers/messagesController')

const router = express.Router()

router.route('/start-chat').post(createRoom)
router.route('/get-chatrooms/:userId').get(getAllChatroomsById)
router.route('/get-chatroomss/:userEmail').get(getAllChatroomsByEmail)

module.exports = router
