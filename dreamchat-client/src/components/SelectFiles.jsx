/* eslint-disable react/prop-types */
import { FcAddImage } from 'react-icons/fc'
import { AiTwotoneDelete } from 'react-icons/ai'
import { useRef, useState } from 'react'

const SelectFiles = ({ files, setFiles, displayFiles, setDisplayFiles }) => {
  const fileInputRef = useRef(null)
  //const [fileType, setFileType] = useState('')

  const onSelectFile = async (e) => {
    const selectedFiles = []
    const targetFiles = e.target.files
    const targetFilesObject = [...targetFiles]
    targetFilesObject.map((file) => {
      return selectedFiles.push(URL.createObjectURL(file))
    })
    setDisplayFiles(selectedFiles)
    setFiles(e.target.files)
    // for (let file of files) {
    //   console.log(file.type)
    //   setFileType(file.type)
    // }
  }

  function deleteHandler(e) {
    const del = displayFiles.filter((url, index) => index !== e)
    setDisplayFiles(del)
    setFiles(null)
    console.log(del)
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  return (
    <div className='relative'>
      <div className='file-input relative w-[45px] flex items-center'>
        <input
          type='file'
          className='w-full h-full z-10 opacity-0 relative cursor-pointer'
          name='files'
          multiple
          id='files'
          onChange={onSelectFile}
          accept='image/*, video/*'
          ref={fileInputRef}
        />
        <button className='absolute top-0 cursor-pointer text-4xl'>
          <FcAddImage />
        </button>
      </div>
      {displayFiles.map((url, index) => {
        const file = files[index]
        return (
          <div
            key={index}
            className='preview-div absolute -top-64 w-[200px] md:ml-[20%] bg-gray-300 rounded-2xl'
          >
            <div
              className='img-preview flex flex-col items-center justify-center'
              id='img-preview'
            >
              {file.type.startsWith('image') ? (
                <img
                  className='w-[98%] py-2 px-2 rounded-2xl'
                  src={url}
                  alt=''
                />
              ) : (
                <video
                  controls
                  style={{ maxWidth: '100%', maxHeight: '400px' }}
                >
                  <source src={url} type={file.type} />
                </video>
              )}
              <span
                className='text-3xl text-red-400 hover:text-red-600 cursor-pointer pb-1'
                onClick={() => deleteHandler(index)}
              >
                <AiTwotoneDelete />
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SelectFiles
