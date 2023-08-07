import React, { useRef } from 'react'


function FileUploader({onFileSelect, onFileSelectSuccess = () => {}, onFileSelectError = () => {} }) {

    const fileInput = useRef(null)

    const handleFileInput =(e)=>{
        onFileSelect(e.target.files[0])
        const file = e.target.files[0]

        if (!file){
            onFileSelectError ({error : "Please select a file"})
        } else {
            onFileSelect(file)
            onFileSelectSuccess (file)
        } 
        
    }

  return (
    <div className='file-uploader'>
        <label>Add an photo of the bicycle</label>
        <input type="file" onChange={handleFileInput}>
        </input>
        {/* <button onClick={e=>fileIntput.current && fileIntput.current.click()} className='btn btn-primary'>Choose file</button> */}
    </div>
  )
}

export default FileUploader