import logo from '../assets/background-heart-icon.jpg'
import './chatroom.css'

const ChatPage = () => {
  return (
    <div className='chatpage h-screen absolute right-0 w-[70%] px-2 bg-gray-300 xs:hidden sm:hidden md:hidden lg:block'>
      <img
        className='md:w-[20%] mb-10 border-2 border-red-400 rounded-2xl ml-[40%] lg:mt-[30%] xl:mt-[25%]'
        src={logo}
        alt=''
      />
      <div className='text-center mt-10'>
        <h1 className='font-bold text-red-500'>DreamMatch for Desktop</h1>
        <p>
          Send and Receive messages to your new dates and stay connected online
        </p>
      </div>
    </div>
  )
}

export default ChatPage
