/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewRoom } from '../api/all-chats-api'
import { UserAuth } from '../context/AuthContext'

const NewRoom = () => {
  const { currentUser } = UserAuth()
  const senderId = currentUser?.user?._id

  const queryClient = useQueryClient()

  const [recipientEmail, setRecipientEmail] = useState('')
  const [text, setText] = useState('')

  const createRoomMutation = useMutation({
    mutationFn: createNewRoom,
    onSuccess: (data) => {
      console.log(data)
      setText('')
      setRecipientEmail('')
      queryClient.invalidateQueries({
        queryKey: ['chatroomsId'],
      })
      queryClient.invalidateQueries({
        queryKey: ['chatroomsEmail'],
      })
      alert('message sent, click close button')
    },
  })

  const handleSend = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('text', text)
    formData.append('senderId', senderId)
    formData.append('recipientEmail', recipientEmail)

    createRoomMutation.mutate({ formData })
  }

  if (createRoomMutation.isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col items-center gap-5 w-full bg-gray-100 border border-gray-200 rounded'>
      <h3 className='font-bold text-lg mb-2'>Create a chat room</h3>
      <form onSubmit={handleSend} className='flex flex-col items-center gap-5'>
        <input
          className='px-2 w-full py-2 rounded'
          type='email'
          name='recipientEmail'
          value={recipientEmail}
          placeholder='Enter receiver email'
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
        <textarea
          className='px-2 w-full col-span-4 rounded'
          name='text'
          value={text}
          placeholder='Enter message'
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className='bg-red-400 text-white px-4 py-2 rounded'
          type='submit'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default NewRoom
