/* eslint-disable react/prop-types */
import './chatPreview.css'

const ChatPreview = ({ lastMessage }) => {
  return (
    <div className='lastMsg flex'>
      <img
        className={`${lastMessage ? 'avatar' : ' hidden'} `}
        src={lastMessage ? lastMessage?.avatar : ''}
        alt=''
      />
      <h1 className='text-black px-2 overflow-hidden text-ellipsis whitespace-nowrap'>
        {lastMessage ? lastMessage?.text : 'start new chat'}
      </h1>
    </div>
  )
}

export default ChatPreview
