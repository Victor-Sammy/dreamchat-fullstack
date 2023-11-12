export const chatroomsId = 'http://localhost:5000/room/get-chatrooms'

export const chatroomsEmail = 'http://localhost:5000/room/get-chatroomss'

export const chatroom = 'http://localhost:5000/room/get-chatroom'

const uploadFormData = async ({ formData }) => {
  try {
    const response = await fetch(`http://localhost:5000/room/send-message`, {
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

export { uploadFormData }
