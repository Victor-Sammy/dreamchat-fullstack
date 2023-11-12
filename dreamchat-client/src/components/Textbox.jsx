/* eslint-disable react/prop-types */

const Textbox = ({ getRoom }) => {
  return (
    <div>
      <h1 className='text-black px-2 overflow-hidden text-ellipsis whitespace-nowrap'>
        {getRoom ? getRoom?.text[getRoom?.text.length - 1] : 'start new chat'}
      </h1>
    </div>
  )
}

export default Textbox
