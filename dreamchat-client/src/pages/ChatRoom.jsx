/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import ChatBox from '../components/ChatBox'
import SendMessage from '../components/SendMessage'
import './chatroom.css'
import axios from 'axios'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { chatroom } from '../api/all-chats-api'

const ChatRoom = ({
  isButtonVisible,
  setIsButtonVisible,
  user,
  isSent,
  setIsSent,
}) => {
  const { id } = useParams()
  console.log(isButtonVisible, user)
  console.log(isSent, id)
  const [files, setFiles] = useState([])
  const [displayFiles, setDisplayFiles] = useState([])

  const scrollRef = useRef(null)
  const history = useNavigate()
  const recipient = localStorage.getItem('recipient')

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const {
    data: roomData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['room', id],
    queryFn: async () =>
      await axios.get(`${chatroom}/${id}`).then((res) => res.data),
  })

  console.log(roomData)
  const roomMessages = roomData && roomData?.messages

  const handleGoBack = () => {
    history('/allChats/chatpage')
  }

  return (
    <div
      ref={scrollRef}
      className='chatroom absolute right-0 lg:w-[70%] md:w-full xs:w-full px-2'
    >
      <div
        className='text-2xl text-bl fixed mt-20 lg:hidden md:block xs:block cursor-pointer
    '
        onClick={() => {
          setIsButtonVisible(true)
          handleGoBack()
          console.log(isButtonVisible)
        }}
      >
        <AiOutlineArrowLeft />
      </div>
      <div>{isLoading && 'loading...'}</div>
      <div>{isError && 'Error fetching room data'}</div>
      <h1 className='text-black font-semibold mt-20 text-center'>
        Chatting with {recipient}
      </h1>
      <ChatBox messages={roomMessages} />
      <div className='relative'>
        <SendMessage
          files={files}
          setFiles={setFiles}
          RoomID={id}
          isSent={isSent}
          setIsSent={setIsSent}
          displayFiles={displayFiles}
          setDisplayFiles={setDisplayFiles}
        />
      </div>
    </div>
  )
}

export default ChatRoom
