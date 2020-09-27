import React, { useState } from "react"
import ImageModal from "../../UI/ImageModal/ImageModal"
import styles from "./ImageGrid.module.scss"

export default function ImageGrid({ images, top, showModalBtn, type, size }) {
  const [showModal, setShowModal] = useState(showModalBtn || false)
  const [selectedImg, setSelectedImg] = useState(0)

  const modalClosed = () => {
    setShowModal(false)
  }

  const selectImage = i => {
    setShowModal(true)
    setSelectedImg(i)
  }

  return (
    <>
      <div className={top ? styles.imgGridTop : styles.imgGrid}>
        {images.map((image, index) => {
          let finalImage = null
          if (image.picture) {
            finalImage = image.picture
          } else if (image.name) {
            // pour le dropZone
            finalImage = image.name
          }
          return (
            <div className={styles.singleImg} key={index} onClick={() => selectImage(index)}>
              <img src={finalImage} />
            </div>
          )
        })}
      </div>

      {showModal && images.length > 0 && <ImageModal images={images} close={modalClosed} type={type} selectedImg={selectedImg} />}
    </>
  )
}
