import React, { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import { GET_IMAGES } from "../../../../../qraphQl/imageType"
import ImageModal from "../../../../UI/ImageModal/ImageModal"
import { BsFillPeopleFill, BsStarFill } from "react-icons/bs"
import { AiFillCamera } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import { upCaseFirstLetter } from "../../../../../utils/string"
import styles from "./FeaturedImage.module.scss"
import useDefinePage from "../../../../../useFuction/useDefinePage"

function FeaturedImage() {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const PER_PAGE = 6

  const page = useDefinePage()

  const [getImages, { data }] = useLazyQuery(GET_IMAGES)

  useEffect(() => {
    if (page >= 0) {
      getImages({ variables: { first: PER_PAGE, skip: PER_PAGE * page, orderBy: "score_DESC", appropriate: true } })
    }
  }, [page])

  const modalClosed = () => {
    setShowModal(false)
  }

  const imageClickHandler = i => {
    setSelectedImgIndex(i)
    setShowModal(true)
  }

  let images = data ? data.images : []
  let modalInfo = []

  if (images.length) {
    images.forEach(pic => {
      let detailedInfo = {
        picId: pic._id,
        picture: pic.picture,
        picDesc: pic.desc ? pic.desc : null,
        picClaps: pic.claps || 0,
        id: pic.author._id,
        name: pic.author.userName,
        profPic: pic.author.picture,
        nbrRev: pic.author.nbrRev,
        revPic: pic.author.revPic,
        createdAt: pic.createdAt
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
              <div className={styles.revContainerAvatar}>{img.author.picture ? <img src={img.author.picture} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>

              <div>
                <div className={styles.revAuth}>
                  <Link to={`/profile/${img.author._id}`}>{upCaseFirstLetter(img.author.userName)}</Link>
                </div>

                <div className="chipsContainer">
                  <div className="chip">
                    <BsFillPeopleFill color="#0996e8" />
                    <div className="label">{img.author.nbrFollowers}</div>
                  </div>
                  <div className="chip">
                    <BsStarFill color="#0996e8" />
                    <div className="label">{img.author.nbrRev} </div>
                  </div>
                  <div className="chip">
                    <AiFillCamera color="#0996e8" />
                    <div className="label">{img.author.revPic}</div>
                  </div>
                </div>

                <div className={styles.busSection}>
                  <div className={styles.busName}>
                    <span>for: </span>
                    <Link to={`/business/${img.business._id}`}>{upCaseFirstLetter(img.business.name)}</Link>
                  </div>
                  <div className={styles.location}>
                    <Link to={`/tax/location/${img.business.city}/${img.business.neighborhood}`}>{img.business.neighborhood}</Link>
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
