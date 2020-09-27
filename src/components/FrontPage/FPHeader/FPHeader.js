import React, { useContext, useState, useEffect } from "react"
import SearchFilter from "../../Search/SearchFilter/SearchFilter"
import styles from "./FPHeader.module.scss"
import LoginBtn from "../../Register/Forms/LoginBtn/LoginBtn"
import { useLazyQuery } from "@apollo/react-hooks"
import { GET_TOP_FEATURED_IMAGES } from "../../../qraphQl/imageType"
import { upCaseFirstLetter } from "../../../utils/string"
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { DispatchContext } from "../../../Context"

const FPHeader = () => {
  const appDispatch = useContext(DispatchContext)
  let skip

  const [getImages, { data }] = useLazyQuery(GET_TOP_FEATURED_IMAGES, {
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "success" } })
      window.scrollTo(0, 0)
    }
  })

  useEffect(() => {
    skip = Math.round(Math.random() * 8)
    getImages({ variables: { first: 1, skip, orderby: "score_DESC" } })
  }, [])

  const images = data ? data.images : null

  const isTablet = useMediaQuery({ query: "(min-device-width: 768px)" })
  const isDesk = useMediaQuery({ query: "(min-device-width: 1024px)" })

  let ImageSize = isDesk ? "t_huge" : isTablet ? "t_large" : "t_meduim"

  return (
    <div className={styles.bgImage} style={{ backgroundImage: `url(${images && images[0] ? images[0].picture.replace("t_meduim", ImageSize) : null})` }}>
      <div className={styles.navigation}>
        <LoginBtn FP={true} />
      </div>
      <div className={styles.main}>
        <img src={require("../../../static/image/logo.png")} alt="" />
        <div className={styles.search}>
          <SearchFilter FP={true} />
        </div>
      </div>

      {images && images[0] && (
        <div className={styles.imageInfo}>
          by <span>{images ? <Link to={`/profile/${images[0].author._id}`}>{upCaseFirstLetter(images[0].author.userName)}</Link> : null}</span> for <span>{images ? <Link to={`/business/${images[0].business._id}`}>{upCaseFirstLetter(images[0].business.name)}</Link> : null}</span>
        </div>
      )}
    </div>
  )
}

export default FPHeader
