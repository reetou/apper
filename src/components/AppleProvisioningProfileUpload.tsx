import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
  onUpload: (file: File) => void,
}

export default function AppleProvisioningProfileUpload(props: Props) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    if (!acceptedFiles.length) {
      return
    }
    props.onUpload(acceptedFiles[0])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: ['.mobileprovision'],
    maxFiles: 1,
    noKeyboard: true,
  })
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}