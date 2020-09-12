import React, { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import ImageGrid from "../../UI/ImageGrid/ImageGrid"
import styles from "./DropZone.module.scss"

function DropZone({ field, form }) {
  const { name } = field
  const { setFieldValue } = form
  const [img, setImg] = useState([])
  const [statefiles, setStatefiles] = useState([])

  const [imgError, setImgError] = useState(null)

  const onDrop = acceptedFiles => {
    setImgError(null)
    // file is what is sent to the server
    // img is what is sent to the image grid component

    setImg([])
    let firstThreeFile = acceptedFiles.slice(-3)
    let files = [...statefiles, ...firstThreeFile]
    let selectedFiles = files.slice(-3)

    setStatefiles(selectedFiles)

    switch (selectedFiles.length) {
      case 1:
        setImg(prev => prev.slice(0, 1))
        break
      case 2:
        setImg(prev => prev.slice(0, 2))
        break
      case 3:
        setImg(prev => prev.slice(0, 3))
        break
    }

    for (const file of selectedFiles) {
      if (file.type != "image/jpeg" && file.type != "image/png") {
        continue
      }

      if (file.size >= 4000000) {
        setImgError("some images are not uploaded because there are too large")
        continue
      }

      const myFileReader = new FileReader()
      myFileReader.addEventListener(
        "load",
        () => {
          setImg(prevImg => [...prevImg, { name: myFileReader.result }])
        },
        false
      )
      myFileReader.readAsDataURL(file)
    }

    setFieldValue(name, selectedFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true })

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Select up to 3 images</p>
        {imgError && <p className={styles.error}>Error: {imgError}</p>}
      </div>
      {img.length ? <ImageGrid images={img} /> : null}
    </section>
  )
}

export default DropZone
