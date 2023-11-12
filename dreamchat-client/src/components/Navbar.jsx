import { UserAuth } from '../context/AuthContext'
import logo from '../assets/background-heart-icon.jpg'
import './dream.css'

const Navbar = () => {
  const { currentUser, logout } = UserAuth()
  console.log(currentUser?.user?.username)
  const userName = currentUser?.user?.username
  const firstLetter = userName ? userName[0] : ''
  console.log(firstLetter)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='navbar z-10 fixed bg-gray-100 text-neutral-content'>
      <div className='w-full flex justify-between text-red-500'>
        <div className='flex items-center'>
          <a className='btn btn-ghost normal-case font-bold text-xl flex'>
            DreamMatch
          </a>
          <img className='w-10 h-10 rounded' src={logo} alt='' />
        </div>
        {currentUser ? (
          <div className='flex items-center gap-5'>
            <div className='rounded-[50%] w-10 h-10 text-3xl font-semibold flex items-center justify-center bg-orange-200'>
              {firstLetter}
            </div>
            <button className='font-semibold' onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Navbar
