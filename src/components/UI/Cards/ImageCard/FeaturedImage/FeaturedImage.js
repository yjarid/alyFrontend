import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_FEATURED_IMAGES } from "../../../../../qraphQl/imageType"
import ImageModal from "../../../../UI/ImageModal/ImageModal"
import { BsFillPeopleFill, BsStarFill } from "react-icons/bs"
import { AiFillCamera } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import { upCaseFirstLetter } from "../../../../../utils/string"
import styles from "./FeaturedImage.module.scss"

function FeaturedImage() {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const { data, error, loading } = useQuery(GET_FEATURED_IMAGES, { variables: { featured: "TWO", limit: 4 } })

  const modalClosed = () => {
    setShowModal(false)
  }

  const imageClickHandler = i => {
    setSelectedImgIndex(i)
    setShowModal(true)
  }

  let images = data ? data.images : []
  let modalInfo = []
  console.log(images)
  if (images.length) {
    images.forEach(pic => {
      let detailedInfo = {
        picId: pic._id,
        picture: pic.picture,
        picDesc: pic.desc ? pic.desc : null,
        picClaps: pic.claps || 0,
        id: pic.review.author._id,
        name: pic.review.author.userName,
        profPic: pic.review.author.picture,
        nbrRev: pic.review.author.nbrRev,
        revPic: pic.review.author.revPic,
        createdAt: pic.review.createdAt
      }
      modalInfo.push(detailedInfo)
    })
  }
  return (
    <>
      {images.map((img, i) => {
        return (
          <div key={img._id} onClick={() => imageClickHandler(i)}>
            <div className={styles.revContainerInner}>
              <div className={styles.revContainerAvatar}>{img.review.author.picture ? <img src={img.review.author.picture} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>

              <div>
                <div className={styles.revAuth}>
                  <Link to={`/profile/${img.review.author._id}`}>{upCaseFirstLetter(img.review.author.userName)}</Link>
                </div>

                <div className="chipsContainer">
                  <div className="chip">
                    <BsFillPeopleFill color="#0996e8" />
                    <div className="label">{img.review.author.followers.length}</div>
                  </div>
                  <div className="chip">
                    <BsStarFill color="#0996e8" />
                    <div className="label">{img.review.author.nbrRev} </div>
                  </div>
                  <div className="chip">
                    <AiFillCamera color="#0996e8" />
                    <div className="label">{img.review.author.revPic}</div>
                  </div>
                </div>

                <div className={styles.busSection}>
                  <div className={styles.busName}>
                    <span>for: </span>
                    <Link to={`/business/${img.review.business._id}`}>{upCaseFirstLetter(img.review.business.name)}</Link>
                  </div>
                  <div className={styles.location}>
                    <Link to={`/tax/location/${img.review.business.city}/${img.review.business.neighborhood}`}>{img.review.business.neighborhood}</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <img src={img.picture} />
            </div>
          </div>
        )
      })}

      {showModal && images.length > 0 && <ImageModal images={modalInfo} close={modalClosed} selectedImg={selectedImgIndex} />}
    </>
  )
}

export default FeaturedImage
