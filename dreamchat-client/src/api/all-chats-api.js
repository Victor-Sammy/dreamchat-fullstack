import { baseURL } from './root-api'

export const chatroomsId = `${baseURL}/room/get-chatrooms`

export const chatroomsEmail = `${baseURL}/room/get-chatroomss`

export const chatroom = `${baseURL}/room/get-chatroom`

const uploadFormData = async ({ formData }) => {
  try {
    const response = await fetch(`${baseURL}/room/send-message`, {
      method: 'POST',
      body: formData,
      // Add necessary headers if required
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error uploading form data: ' + error.message)
  }
}

const createNewRoom = async ({ formData }) => {
  try {
    const response = await fetch(`${baseURL}/room/start-chat`, {
      method: 'POST',
      body: formData,
      // Add necessary headers if required
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error creating new room: ' + error.message)
  }
}

export { uploadFormData, createNewRoom }
