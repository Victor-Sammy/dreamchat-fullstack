/* eslint-disable react/prop-types */
import './chatPreview.css'
import Textbox from './Textbox'

const PreviewBox = ({ isSent, room }) => {
  console.log(room, isSent)

  return (
    <div className='lastMsg overflow-hidden'>
      <Textbox getRoom={room} isSent={isSent} />
    </div>
  )
}

export default PreviewBox
