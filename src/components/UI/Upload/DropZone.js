import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import styles from "./DropZone.module.scss"

function DropZone({ field, form }) {
  const { name, value } = field
  const { setFieldValue } = form
  const [img, setImg] = useState(value)

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    const myFileReader = new FileReader()
    myFileReader.addEventListener(
      "load",
      () => {
        setImg(myFileReader.result)
      },
      false
    )

    myFileReader.readAsDataURL(file)
    setFieldValue(name, file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  return (
    <div className={styles.buzPicture}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className={styles.dropBox}>Select new image</p>
      </div>
      {img && (
        <div className={styles.imgProfile}>
          <img src={img} />
        </div>
      )}
    </div>
  )
}

export default DropZone
