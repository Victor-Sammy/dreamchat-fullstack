const express = require('express')
const {
  createRoom,
  getAllChatroomsById,
  getAllChatroomsByEmail,
} = require('../controllers/messagesController')
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router()

router.route('/start-chat').post(createRoom)
router.route('/get-chatrooms/:userId').get(getAllChatroomsById, validateToken)
router
  .route('/get-chatroomss/:userEmail')
  .get(getAllChatroomsByEmail, validateToken)

module.exports = router
