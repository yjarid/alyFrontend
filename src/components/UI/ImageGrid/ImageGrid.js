import React, { useState } from "react"
import ImageModal from "../../UI/ImageModal/ImageModal"
import styles from "./ImageGrid.module.scss"

export default function ImageGrid({ images, top, showModalBtn, type, size }) {
  const [showModal, setShowModal] = useState(showModalBtn || false)

  const modalClosed = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className={top ? styles.imgGridTop : styles.imgGrid}>
        {images.map((image, i) => {
          let finalImage = null
          if (image.picture) {
            finalImage = image.picture.replace("t_meduim", "t_small")
          } else if (image.name) {
            // pour le dropZone
            finalImage = image.name.replace("t_meduim", "t_small")
          }
          return (
            <div className={styles.singleImg} key={i} onClick={() => setShowModal(true)}>
              <img src={finalImage} />
            </div>
          )
        })}
      </div>

      {showModal && images.length > 0 && <ImageModal images={images} close={modalClosed} type={type} />}
    </>
  )
}
