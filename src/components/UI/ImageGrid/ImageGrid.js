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
      <div className={styles.mainContainer}>
        <div className={top ? styles.imgGridTop : styles.imgGrid}>
          {images.map((image, index) => {
            let finalImage = null
            if (image.picture) {
              // meduim for images at the top of single business page and small size for review card
              finalImage = top ? image.picture : image.picture.replace("t_meduim", "t_small")
            } else if (image.name) {
              // pour le dropZone
              finalImage = image.name.replace("t_meduim", "t_small")
            }
            return (
              <div className={styles.singleImg} key={index} onClick={() => selectImage(index)}>
                <img src={finalImage} />
              </div>
            )
          })}
        </div>
      </div>

      {showModal && images.length > 0 && <ImageModal images={images} close={modalClosed} type={type} selectedImg={selectedImg} />}
    </>
  )
}
