/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import Message from './Message'
import '../pages/chatroom.css'

const ChatBox = ({ messages }) => {
  const messageEndRef = useRef()
  //const [audio, setAudio] = useState()

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behaviour: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className='messagesContainer pb-44 pl-[5%] pt-20 containerWrap'>
      {messages?.map((message) => (
        <>
          <Message key={message?._id} message={message} />
        </>
      ))}
      <div ref={messageEndRef}></div>
    </div>
  )
}

export default ChatBox
