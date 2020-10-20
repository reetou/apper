import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadContainer from "./UploadContainer";

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
  })
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <UploadContainer
        title="Apple Provisioning Certificate (.mobileprovision extension)"
        isDragActive={isDragActive}
      />
    </div>
  )
}