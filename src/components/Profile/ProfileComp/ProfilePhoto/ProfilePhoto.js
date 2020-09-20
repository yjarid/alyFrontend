import React, { useState, Fragment } from "react"
import { useParams } from "react-router-dom"
import styles from "./ProfilePhoto.module.scss"
import ImageCard from "../../../UI/Cards/ImageCard/ImageCard"
import ImageModal from "../../../UI/ImageModal/ImageModal"
import imageFromPicture from "../../../../utils/imageFromPicture"
import { IMAGES_USER } from "../../../../qraphQl/imageType"
import { useQuery } from "@apollo/react-hooks"

function ProfilePhoto({ reviews, isOwner }) {
  const { id } = useParams()
  const { data, error, loading } = useQuery(IMAGES_USER, { variables: { userID: id } })

  let pictures = data ? data.images : []

  const [showModal, setShowModal] = useState(false)
  const [index, setIndex] = useState(0)

  let imageinfo = imageFromPicture(pictures)

  const modalClosed = () => {
    setShowModal(false)
  }

  const selectImg = i => {
    setIndex(i)
    setShowModal(true)
  }

  return (
    <Fragment>
      {showModal && <ImageModal images={imageinfo} close={modalClosed} selectedImg={index} type="business" />}
      <div className={styles.imageGrid}>
        {imageinfo.map((singleImg, i) => (
          <div key={singleImg.picId}>
            <ImageCard singleImg={singleImg} isOwner={isOwner} selectImg={() => selectImg(i)} />
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default ProfilePhoto
