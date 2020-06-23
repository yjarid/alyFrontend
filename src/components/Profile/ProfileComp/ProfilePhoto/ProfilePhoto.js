import React, { useState, Fragment } from "react"
import styles from "./ProfilePhoto.module.scss"
import ImageCard from "../../../UI/Cards/ImageCard/ImageCard"
import ImageModal from "../../../UI/ImageModal/ImageModal"
import imageFromReviews from "../../../../utils/imageFromReviews"

function ProfilePhoto({ reviews, isOwner }) {
  const [showModal, setShowModal] = useState(false)
  const [index, setIndex] = useState(0)
  
  let imageinfo = imageFromReviews(reviews)

 

  const modalClosed = () => {
    setShowModal(false)
  }

  const selectImg = i => {
    console.log(i)
    setIndex(i)
    setShowModal(true)
  }

  return (
    <Fragment>
      {showModal && <ImageModal images={imageinfo} close={modalClosed} selectedImg={index} type='business'/>}
      <div className={styles.imageGrid}>
        {imageinfo.map((singleImg, i) => (
          <div key={singleImg.picId} onClick={() => selectImg(i)}>
            <ImageCard singleImg={singleImg} isOwner={isOwner} />
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default ProfilePhoto
