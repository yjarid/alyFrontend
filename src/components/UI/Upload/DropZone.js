import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import styles from "./DropZone.module.scss"

function DropZone({ field, form }) {
  const { name, value } = field
  const { setFieldValue, setFieldError } = form
  const [img, setImg] = useState(value)
  const [imgError, setImgError] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    setImgError(null)
    const file = acceptedFiles[0]
    if (file.type != "image/jpeg" && file.type != "image/png") {
      setImgError("please select images only")
      return
    }
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
        {imgError && <p className={styles.error}>Error: {imgError}</p>}
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
