const asyncHandler = require('express-async-handler')
//const Message = require('../models/messageModel')
const ChatRoom = require('../models/chatRoomModel')
const User = require('../models/userModel')
// const stream = require('stream')
// const { google } = require('googleapis')
// const fs = require('fs')
// const path = require('path')
//const { auth } = require('googleapis/build/src/apis/acceleratedmobilepageurl')

// const scopes = ['https://www.googleapis.com/auth/drive']

// // Set up authentication
// const KeyFilePath = './dream.json'
// const auth = new google.auth.GoogleAuth({
//   keyFile: KeyFilePath, // Your credentials file
//   scopes: scopes,
// })

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
  //res.status(201).send('room created')
  // CONNECT A USER TO MULTIPLE CHATROOMS
})

// const getChatRoom = asyncHandler(async (req, res) => {
//   const chatRoomId = req.params.chatRoomId

//   try {
//     const messages = await Message.find({ chatRoom: chatRoomId })
//       // const fromUser = await Message.find({ chatRoom: chatRoomId })
//       //   .select('from')
//       //   // .populate('text')
//       .sort('timestamp')

//     const response = {
//       messages: messages,
//       //from: fromUser,
//     }

//     res.status(200).send(response)
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve messages' })
//   }
// })

const getAllChatroomsById = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  try {
    const chatRooms = await ChatRoom.find({ from: userId }).populate('from')
    //.populate('to')

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

//const sendMessages = asyncHandler(async (req, res) => {
//     //const { chatRoomId, fromUserId, text } = req.body
//       try {
// const chatRoom = ChatRoom.findById(chatRoomId).select('_id')
// const fromUser = User.findById(fromUserId)
//authorizing client
// async function authorize() {
//   const jwtClient = new google.auth.JWT(
//     apikeys.client_email,
//     null,
//     apikeys.private_key,
//     scopes
//   )
//   jwtClient.authorize(function (err, tokens) {
//     console.log('uploading...')
//     if (err) {
//       console.log(err)
//       return
//     }
//     const drive = google.drive({ version: 'v3', auth: jwtClient })
//     // Use the 'drive' object to make Google Drive API requests here
//     var fileMetadata = {
//       name: req.file.originalname,
//       parent: ['1Ga13QXUDqCRmwgFS2Tm4f3tnoC06HuGm'],
//     }
//     drive.files.create(
//       {
//         resource: fileMetadata,
//         media: {
//           body: fs.createReadStream(req.file.path),
//           mimeType: 'image/jpeg',
//         },
//         fields: 'id',
//         supportsAllDrives: true,
//       },
//       function (err, file) {
//         if (err) {
//           console.log(err)
//         }
//         console.log(file)
//         console.log(jwtClient)
//         //const fileId = file.data.id
//         // drive.permissions.create({
//         //   resource: {
//         //     type: 'user',
//         //     role: 'writer',
//         //     emailAddress: 'victorsammy1997@gmail.com', // <--- Please set the email of your Google account.
//         //   },
//         //   fileId: fileId,
//         //   fields: 'id',
//         // })
//         res.send(file)
//       }
//     )
//   })
// }

//Uploading file to Google Drive
// async function uploadFileToDrive(jwtClient) {
//   console.log('upload started...')
//   return new Promise((resolve, rejected) => {
//     // Create a client instance for authentication
//     const drive = google.drive({ version: 'v3', auth: jwtClient })
//     var fileMetadata = {
//       name: req.file.originalname,
//       parent: ['1Ga13QXUDqCRmwgFS2Tm4f3tnoC06HuGm'],
//     }
//     drive.files
//       .create({
//         resource: fileMetadata,
//         media: {
//           body: fs.createReadStream(req.file.path),
//           mimeType: 'image/jpeg',
//         },
//         fields: 'id',
//         supportsAllDrives: true,
//       })
//       .then(function (file) {
//         const fileId = file.data.id
//         console.log('File Id: ', fileId)
//         drive.permissions.create(
//           {
//             resource: {
//               type: 'user',
//               role: 'writer',
//               emailAddress: 'victorsammy1997@gmail.com', // <--- Please set the email of your Google account.
//             },
//             fileId: fileId,
//             fields: 'id',
//           },
//           function (err, res) {
//             if (err) {
//               console.log(err)
//               return rejected(err)
//             }
//             console.log(res)
//             resolve(res)
//           }
//         )
//       })
//   }).catch(function (err) {
//     console.log(err)
//   })

// function (err, file) {
//   if (err) {
//     return rejected(err)
//   }
//   const fileId = file.data.id
//   console.log('uploaded!', fileId)
//   resolve(file)
//   drive.permissions.create()
// }

// console.log(res.data.id)
// //creating new Message document in Mongodb
// const newMessage = new Message({
//   chatRoom: chatRoom,
//   from: fromUser,
//   text,
//   image: res.data.id,
// })

// newMessage.save()
// res.status(200).send(newMessage)
// return res.data.id
//}

//authorize()
//   .then(uploadFileToDrive())
//   .catch((err) => console.log(err))
// res.status(201).send('upload success!')
//uploadFileToDrive(req.file.path, req.file.filename)

// for (let f = 0; f < files.length; f += 1) {
//   uploadFile(file)
// }
//uploadFile(file)

// const { file } = req
// console.log(file.originalname)

//           res.status(200).send('Form Submitted')
//         } catch (f) {
//           res.send(f)
//         }
//         //res.status(200).send(req.file.originalname)
//       }

// if (!req.file) {
//   return res.status(400).send('No files were uploaded.')
// }

// // Process the file here as needed

//res.send('File uploaded!')
//})

//const uploadFile = async (fileObject) => {
// const bufferStream = new stream.PassThrough()
// bufferStream.end(fileObject.buffer)
// const { data } = await google.drive({ version: 'v3', auth }).files.create({
//   media: {
//     mimeType: fileObject.mimeType,
//     body: fs.createReadStream(fileObject.path),
//   },
//   requestBody: {
//     name: fileObject.originalname,
//     parents: ['1Ga13QXUDqCRmwgFS2Tm4f3tnoC06HuGm'],
//   },
//   fields: 'id,name',
// })
// console.log(`Uploaded file ${data.name} ${data.id}`)
//}

// const getAllMessages = asyncHandler(async (req, res) => {
//   const userEmail = req.params.userEmail

//   try {
//     const allMessages = await Message.find({
//       from: userEmail,
//     })
//       .populate({ path: 'from', select: 'username' })
//       .exec()

//     res.status(200).send({ allMessages })
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve messages' })
//   }
// })

module.exports = {
  createRoom,
  //getAllMessages,
  getAllChatroomsByEmail,
  getAllChatroomsById,
  //getChatRoom,
  //sendMessages,
}
