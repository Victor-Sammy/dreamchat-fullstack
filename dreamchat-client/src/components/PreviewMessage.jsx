/* eslint-disable react/prop-types */
import './chatPreview.css'

const PreviewMessage = ({ lastMessage3 }) => {
  return (
    <div className='lastMsg flex'>
      <img
        className={`${lastMessage3 ? 'avatar' : ' hidden'} `}
        src={lastMessage3 ? lastMessage3?.avatar : ''}
        alt=''
      />
      <h1 className='text-black px-2 overflow-hidden text-ellipsis whitespace-nowrap'>
        {lastMessage3 ? lastMessage3?.text : 'start new chat'}
      </h1>
    </div>
  )
}

export default PreviewMessage
