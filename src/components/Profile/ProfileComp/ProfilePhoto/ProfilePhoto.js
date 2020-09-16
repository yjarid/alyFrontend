import React, { useState, Fragment } from "react"
import { useParams } from "react-router-dom"
import styles from "./ProfilePhoto.module.scss"
import ImageCard from "../../../UI/Cards/ImageCard/ImageCard"
import ImageModal from "../../../UI/ImageModal/ImageModal"
import imageFromPicture from "../../../../utils/imageFromPicture"
import { PROFILE_INFO_IMAGES } from "../../../../qraphQl/userType"
import { useQuery } from "@apollo/react-hooks"

function ProfilePhoto({ reviews, isOwner }) {
  const { id } = useParams()
  const { data, error, loading } = useQuery(PROFILE_INFO_IMAGES, { variables: { id } })

  let pictures = data ? data.user.revPictures : []

  const [showModal, setShowModal] = useState(false)
  const [index, setIndex] = useState(0)

  let imageinfo = imageFromPicture(pictures)

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
      {showModal && <ImageModal images={imageinfo} close={modalClosed} selectedImg={index} type="business" />}
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
