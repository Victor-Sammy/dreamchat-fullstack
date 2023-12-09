/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import PreviewBox from '../components/PreviewBox'
import '../components/chatPreview.css'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { UserAuth } from '../context/AuthContext'
import axios from 'axios'
import { chatroomsEmail, chatroomsId } from '../api/all-chats-api'
import NewRoom from '../components/NewRoom'

const AllChats = ({
  isButtonVisible,
  setIsButtonVisible,
  isSent,
  setIsSent,
}) => {
  console.log(isButtonVisible)
  const { currentUser } = UserAuth()

  const userID = currentUser ? currentUser?.user?._id : ''
  const userEmail = currentUser ? currentUser?.user?.email : ''

  const queryClient = useQueryClient()
  const modalRef = useRef(null)

  const {
    data: allChatroomsId,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['chatroomsId'],
    queryFn: async () =>
      await axios.get(`${chatroomsId}/${userID}`).then((res) => res.data),
    staleTime: 60000,
    refetchOnWindowFocus: false,
  })

  const { data: allChatroomsEmail } = useQuery({
    queryFn: async () =>
      await axios.get(`${chatroomsEmail}/${userEmail}`).then((res) => res.data),
    queryKey: ['chatroomsEmail'],
    staleTime: 60000,
    refetchOnWindowFocus: false,
  })

  console.log(allChatroomsId)
  console.log(allChatroomsEmail)

  const chatRoomsArray = allChatroomsId || allChatroomsEmail

  const handleClick = () => {
    // Code to execute on the 'xl' breakpoint
    const handleResize = () => {
      if (window.innerWidth <= 1023) {
        setIsButtonVisible(false)
      } else {
        setIsButtonVisible(true)
      }
    }
    // Add event listener to track window resize
    window.addEventListener('resize', handleResize)

    // Initial check on component mount
    handleResize()

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }

  useEffect(() => {
    const modalElement = modalRef.current

    // Set the initial style when the component mounts
    if (modalElement) {
      modalElement.style.display = 'none'
    }
  }, [])

  // modal operation
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'block'
    }
  }

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'none'
    }
  }

  const renderToPage = () => {
    if (chatRoomsArray) {
      return (
        <div className='relative'>
          {chatRoomsArray?.map((room) => (
            <NavLink key={room._id} to={`/allChats/${room._id}`}>
              <div
                key={room?._id}
                className='dashboard-item1 xl:w-[90%]  lg:w-[90%] md:w-full h-20 bg-gray-200 hover:bg-gray-300 mb-10 rounded-xl flex items-center justify-items-center overflow-hidden px-3 xs:w-full'
                onClick={() => {
                  handleClick()
                  queryClient.invalidateQueries({
                    queryKey: ['room', room?.id],
                  })
                  localStorage.setItem('recipient', room.to)
                }}
              >
                <div className='flex gap-5 w-full'>
                  <span className='rounded-full bg-orange-400 w-8 h-8 flex items-center justify-center text-xl'>
                    {room?.to[0]}
                  </span>
                  <PreviewBox
                    key={room._id}
                    room={room}
                    isSent={isSent}
                    setIsSent={setIsSent}
                  />
                </div>
              </div>
            </NavLink>
          ))}
          <button
            className='btn mb-5 bg-gray-800 border border-red-400'
            onClick={openModal}
          >
            start new chat
          </button>
          <div className='absolute top-[250%] w-full'>
            <div
              className='xl:w-[90%] lg:w-[90%] md:w-full xs:w-full relative'
              ref={modalRef}
            >
              <div className='flex flex-col items-center w-full'>
                <div className='w-full'>
                  <NewRoom />
                </div>
                <div className='modal-action bg-gray-800 border border-red-400 rounded-full absolute top-0 right-[7%]'>
                  <button className='btn' onClick={closeModal}>
                    X
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (chatRoomsArray.length === 0) {
      return (
        <div className='relative'>
          <button
            className='btn mb-5 bg-gray-800 border border-red-400'
            onClick={openModal}
          >
            start new chat
          </button>
          <div className='absolute top-[250%] w-full'>
            <div
              className='xl:w-[90%] lg:w-[90%] md:w-full xs:w-full relative'
              ref={modalRef}
            >
              <div className='flex flex-col items-center w-full'>
                <div className='w-full'>
                  <NewRoom />
                </div>
                <div className='modal-action bg-gray-800 border border-red-400 rounded-full absolute top-0 right-[7%]'>
                  <button className='btn' onClick={closeModal}>
                    X
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <div className='allChats lg:w-[30%] xs:w-full block'>
        <div className='chats-board'>
          <Outlet />
          {isButtonVisible && (
            <div className='fixed px-5 xs:w-[100%] lg:w-[30%] h-screen  bg-slate-100'>
              <div className='chats-header'>
                <div></div>
                <div className='text-gray-800 text-3xl font-bold pt-20 pl-10 pb-5 xs:text-start xs:pl-0'>
                  Chats
                </div>
              </div>
              <div>{isLoading && 'Loading'}</div>
              <div>{isError && `Error fetching data`}</div>
              <div className='s-items fixed xs:w-[90%] md:w-[90%] lg:w-[30%]'>
                {renderToPage()}
              </div>
            </div>
          )}
        </div>
        <hr className='demarcation fixed bg-gray-100 border-gray-100 lg:w-[30%] xs:w-full' />
      </div>
    </>
  )
}

export default AllChats
