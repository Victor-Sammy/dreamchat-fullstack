/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewRoom } from '../api/all-chats-api'
import { UserAuth } from '../context/AuthContext'

const NewRoom = ({ isSent, setIsSent }) => {
  console.log(isSent)
  const { currentUser } = UserAuth()
  const senderId = currentUser?.user?._id

  const queryClient = useQueryClient()

  const [recipientEmail, setRecipientEmail] = useState('')
  const [text, setText] = useState('')

  const createRoomMutation = useMutation({
    mutationFn: createNewRoom,
    onSuccess: (data) => {
      console.log(data)
      setIsSent(true)
      setText('')
      setRecipientEmail('')
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
    formData.append('text', text)
    formData.append('senderId', senderId)
    formData.append('recipientEmail', recipientEmail)

    createRoomMutation.mutate({ formData })
  }

  if (createRoomMutation.isPending) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3 className='font-bold text-lg'>Create a chat room</h3>
      <form onSubmit={handleSend}>
        <input
          type='email'
          name='recipientEmail'
          value={recipientEmail}
          placeholder='Enter receiver email'
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
        <textarea
          name='text'
          value={text}
          placeholder='Enter message'
          onChange={(e) => setText(e.target.value)}
        />
        <button className='bg-red-400 text-white'>Send</button>
      </form>
    </div>
  )
}

export default NewRoom
