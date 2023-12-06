/* eslint-disable react/prop-types */
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadFormData } from '../api/all-chats-api'
import SelectFiles from './SelectFiles'

const SendMessage = ({
  displayFiles,
  setDisplayFiles,
  files,
  setFiles,
  RoomID,
  isSent,
  setIsSent,
}) => {
  const [value, setValue] = useState('')
  const { currentUser } = UserAuth()
  console.log(currentUser)
  const userID = currentUser?.user?._id
  console.log(userID, isSent)

  const queryClient = useQueryClient()

  const createMessageMutation = useMutation({
    mutationFn: uploadFormData,
    onSuccess: (data) => {
      console.log(data)
      setIsSent(true)
      setValue('')
      setFiles([])
      queryClient.invalidateQueries({
        queryKey: ['room', RoomID],
      })
      queryClient.invalidateQueries({
        queryKey: ['chatroomsId'],
      })
      queryClient.invalidateQueries({
        queryKey: ['chatroomsEmail'],
      })
    },
  })

  const handleSend = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('text', value)
    formData.append('chatRoomIdString', RoomID)
    formData.append('fromUserId', userID)
    if (files) {
      for (let file of files) {
        formData.append('files', file)
      }
    }
    console.log(files)

    createMessageMutation.mutate({ formData })
  }

  if (createMessageMutation.isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className='bg-slate-100 fixed right-0 bottom-0 lg:w-[70%] md:w-[100%] xs:w-[100%] py-8 shadow-sm shadow-gray-500 flex items-center justify-items-center xs:px-s md:px-0 lg:px-0 z-20'>
      <form onSubmit={handleSend} className='px-2 containerWrap w-full flex'>
        <div className=''>
          <SelectFiles
            files={files}
            setFiles={setFiles}
            displayFiles={displayFiles}
            setDisplayFiles={setDisplayFiles}
          />
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='input md:w-[80%] xs:w-[90%] focus:outline-none bg-white rounded lg:ml-[5%] md:mx-[5%] xs:ml-0'
          type='text'
        />
        <button
          type='submit'
          className='w-[10%] bg-red-500 text-white rounded-r-lg lg:px-5 md:px-5 xs:px-0 m text-sm h-12'
          onClick=''
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default SendMessage
