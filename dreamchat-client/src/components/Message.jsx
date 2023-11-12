/* eslint-disable react/prop-types */

import { UserAuth } from '../context/AuthContext'

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {
  const { currentUser } = UserAuth()

  console.log(currentUser?.user?._id)
  console.log(message?.from)
  // eslint-disable-next-line react/prop-types
  return (
    <div>
      <div
        className={`chat flex flex-col gap-3 ${
          message?.from === currentUser?.user?._id ? 'chat-end' : 'chat-start'
        }`}
      >
        <div
          className={`chat-bubble ${
            message?.from === currentUser?.user?._id
              ? 'bg-gray-500'
              : 'chat-bubble'
          }`}
        >
          {message?.text}
        </div>
        {message.image[0] && (
          <div className='w-40 h-40'>
            {message.image.map((imageUrl, i) => (
              <img
                key={i}
                className={`${
                  message?.from === currentUser?.user?._id
                    ? 'chat-end'
                    : 'chat-start'
                } 'image w-full h-40 object-contain'`}
                src={`https://drive.google.com/uc?export=view&id=${imageUrl}`}
                alt={`Image ${i}`}
              />
            ))}
          </div>
        )}
        {message.video[0] && (
          <div className='w-28 h-28'>
            {message.video.map((videoUrl, i) => (
              <video
                key={i}
                controls
                style={{ maxWidth: '200%', maxHeight: '500px' }}
              >
                <source
                  src={`https://drive.google.com/uc?export=view&id=${videoUrl}`}
                  type=''
                />
              </video>
            ))}
          </div>
        )}
        <div className='chat-footer opacity-50'>Delivered</div>
      </div>
    </div>
  )
}

export default Message
