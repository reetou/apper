import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadContainer from "./UploadContainer";

interface Props {
  onUpload: (file: File) => void,
  file?: File,
}

export default function AppleP12CertUpload(props: Props) {
  const onDrop = (acceptedFiles: File[]) => {
    // Do something with the files
    if (!acceptedFiles.length) {
      return
    }
    props.onUpload(acceptedFiles[0])
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: ['.p12'],
    maxFiles: 1,
  })
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <UploadContainer
        title="Apple Distribution Certificate (.p12 extension)"
        isDragActive={isDragActive}
        file={props.file}
      />
    </div>
  )
}