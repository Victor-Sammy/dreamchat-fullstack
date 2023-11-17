const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const connectDb = require('./config/dbConnect')
const errorHandler = require('./middleware/errorHandler')
const userRoute = require('./routes/userRoutes')
const messagesRoutes = require('./routes/messagesRoutes')
const multer = require('multer')
const MongoDBStore = require('connect-mongodb-session')(session)
const importPassport = require('./passport')
const stream = require('stream')
const { PassThrough } = require('stream')
const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')
const ChatRoom = require('./models/chatRoomModel')
const Message = require('./models/messageModel')
const { ObjectId } = require('mongodb')
const { default: mongoose } = require('mongoose')

const app = express()
dotenv.config()
connectDb()

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

const origin = ['http://localhost:5173', 'https://dreamchatbox.netlify.app']

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// configure the session store
const store = new MongoDBStore({
  uri: process.env.CONNECTION_STRING,
  collection: 'sessions', // Name of the MongoDB collection to store sessions
  expires: 1000 * 60 * 60 * 24 * 7, // Session expiration (e.g., 7 days)
})

//app.set('trust proxy', 1)
app.use(cors({ origin, credentials: true }))
app.set('trust proxy', 1)
app.use(
  session({
    secret: `${process.env.ACCESS_TOKEN_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: store,
    proxy: true,
    cookie: {
      secure: 'auto',
      sameSite: 'none',
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))
app.use(helmet())
app.use(errorHandler)
app.use('/', userRoute)
app.use('/room', messagesRoutes)

const scopes = ['https://www.googleapis.com/auth/drive']

// Set up authentication
const KeyFilePath = './dream.json'
const auth = new google.auth.GoogleAuth({
  keyFile: KeyFilePath, // Your credentials file
  scopes: scopes,
})

// // storage
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: Storage,
})

app.post('/room/send-message', upload.any('files'), (req, res) => {
  const { chatRoomIdString, fromUserId, text } = req.body
  const chatRoomId = new ObjectId(chatRoomIdString)
  const uploadFile = async (fileObject) => {
    if (fileObject) {
      const bufferStream = new stream.PassThrough()
      bufferStream.end(fileObject.buffer)
      const { data } = await google
        .drive({ version: 'v3', auth })
        .files.create({
          media: {
            mimeType: fileObject.mimeType,
            body: fs.createReadStream(fileObject.path),
          },
          requestBody: {
            name: fileObject.originalname,
            parents: ['1Ga13QXUDqCRmwgFS2Tm4f3tnoC06HuGm'],
          },
          fields: 'id,name',
        })
      console.log(`Uploaded file ${data.name} ${data.id}`)
      // const body = {
      //   id: data.id,
      //   name: data.name,
      // }
      const fileId = data.id
      return fileId
    } else {
      return null
    }
  }
  /////////
  const { files } = req
  const imageIds = []
  const videoIds = []
  Promise.all(
    files.map(async (file, index) => {
      try {
        const fileId = await uploadFile(file)
        console.log(fileId, file)
        if (file.mimetype.startsWith('video')) {
          videoIds.push(fileId)
        } else {
          imageIds.push(fileId)
        }
      } catch (error) {
        console.log(error.message)
      }
    })
  )
    .then(async () => {
      if (imageIds || videoIds) {
        const newMessage = await new Message({
          chatRoom: chatRoomId,
          from: fromUserId,
          text,
          image: imageIds,
          video: videoIds,
        })
        await newMessage.save()
        console.log(newMessage)
        res.status(201).send(newMessage)
      } else {
        const newMessage = await new Message({
          chatRoom: chatRoomId,
          from: fromUserId,
          text,
        })
        await newMessage.save()
        console.log(newMessage)
        res.status(201).json({ newMessage })
      }
    })
    .finally(async () => {
      try {
        const messages = await Message.find({
          chatRoom: new ObjectId(chatRoomId),
        }).sort({ createdAt: -1 })

        if (messages.length > 0) {
          const messageTexts = messages.map((message) => message.text)
          await ChatRoom.findByIdAndUpdate(chatRoomId, {
            $push: { text: { $each: messageTexts } },
          })
          console.log('successfuly updated chat room!')
        }
      } catch (error) {
        console.error('Error updating chatroom with last messages:', error)
      }
    })
})
app.get('/room/get-chatroom/:chatRoomId([0-9a-fA-F]{24})', (req, res) => {
  async function fetchMessageById() {
    try {
      const chatRoomIdString = req.params.chatRoomId
      const chatRoomObjId = new mongoose.Types.ObjectId(chatRoomIdString)
      const message = await Message.find({
        chatRoom: new ObjectId(chatRoomObjId),
      })
      return message
    } catch (error) {
      console.error('Error fetching message from MongoDB:', error)
      return null
    }
  }

  async function fetchMessageWithMedia() {
    const messages = await fetchMessageById()
    const images = []
    if (messages.length === 1) {
      // If there is only one message, directly extract the image
      if (messages[0].image) {
        images.push(messages[0].image)
      }
    } else {
      // If there are multiple messages, use the forEach loop
      messages.forEach((message) => {
        if (message.image) {
          images.push(message.image)
        }
      })
    }
    const response = {
      messages,
      images,
    }
    res.send(response)
  }

  fetchMessageWithMedia()
})

app.use('/uploads', express.static('uploads'))
