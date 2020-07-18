import React, { useState } from "react"
import SearchFilter from "../../Search/SearchFilter/SearchFilter"
import styles from "./FPHeader.module.scss"
import LoginBtn from "../../Register/Forms/LoginBtn/LoginBtn"
import { useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_TOP_FEATURED_IMAGES } from "../../../qraphQl/imageType"
import { upCaseFirstLetter } from "../../../utils/string"
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive"

const FPHeader = () => {
  const [imageIndex, setImageIndex] = useState(null)
  const { data } = useQuery(GET_TOP_FEATURED_IMAGES, { variables: { featured: "ONE", limit: 4 } })
  const images = data ? data.images : null

  const isTablet = useMediaQuery({ query: "(min-device-width: 768px)" })
  const isDesk = useMediaQuery({ query: "(min-device-width: 1024px)" })

  let ImageSize = isDesk ? "t_huge" : isTablet ? "t_large" : "t_meduim"

  useEffect(() => {
    let index = Math.round(Math.random() * 3)
    setImageIndex(index)
  }, [])

  return (
    <div className={styles.bgImage} style={{ backgroundImage: `url(${images && images[imageIndex] ? images[imageIndex].picture.replace("t_meduim", ImageSize) : null})` }}>
      <div className={styles.navigation}>
        <LoginBtn FP={true} />
      </div>
      <div className={styles.main}>
        <img src={require("../../../static/image/logo.png")} />
        <div className={styles.search}>
          <SearchFilter FP={true} />
        </div>
      </div>

      {images && images[imageIndex] && (
        <div className={styles.imageInfo}>
          by <span>{images ? <Link to={`/profile/${images[imageIndex].review.author._id}`}>{upCaseFirstLetter(images[imageIndex].review.author.userName)}</Link> : null}</span> for <span>{images ? <Link to={`/business/${images[imageIndex].review.business._id}`}>{upCaseFirstLetter(images[imageIndex].review.business.name)}</Link> : null}</span>
        </div>
      )}
    </div>
  )
}

export default FPHeader
