import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const { currentUser, signinWithGoogle } = UserAuth()
  console.log(currentUser)

  const handleLogin = async () => {
    try {
      await signinWithGoogle()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigate('/allChats/chatpage')
    }
  })

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl text-gray-200 font-bold'>
            Welcome to <span className='text-yellow-500'>DreamMatch</span>,
            where love finds its perfect match!.
          </h1>
          <p className='py-6 text-gray-200'>
            Join our vibrant community of singles, all in search of that elusive
            connection. Whether you`re seeking a lifelong partner or a
            fun-filled adventure, <span>DreamMatch </span>
            is here to make your dreams come true.
          </p>
          <button onClick={handleLogin} className='btn'>
            LOGIN WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
