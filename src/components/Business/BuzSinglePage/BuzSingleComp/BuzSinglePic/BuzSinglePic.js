import React, { useContext } from "react"
import ImageGrid from "../../../../UI/ImageGrid/ImageGrid"
import styles from "./BuzSinglePic.module.scss"
import imageFromPicture from "../../../../../utils/imageFromPicture"
import { IMAGES_BUSINESS } from "../../../../../qraphQl/imageType"
import { useQuery } from "@apollo/react-hooks"
import { useParams, Link } from "react-router-dom"
import { DispatchContext } from "../../../../../Context"

function BuzSinglePic({ busName }) {
  const appDispatch = useContext(DispatchContext)
  const { id } = useParams()

  const { data } = useQuery(IMAGES_BUSINESS, {
    variables: { busID: id, first: 5, orderBy: "score_DESC", appropriate: true },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message, type: "success" } })
      window.scrollTo(0, 0)
    }
  })

  let images = data ? data.images : []
  let modalInfo = imageFromPicture(images)

  return (
    <>
      {modalInfo && (
        <div className={styles.mainContainer}>
          <ImageGrid images={modalInfo} top={true} />
        </div>
      )}
      {images.length > 0 && (
        <div className={styles.allPictureBtnContainer}>
          <Link to={`/business/images/${id}?name=${busName}`}>
            <span className={styles.allPictureBtn}>All Pictures</span>
          </Link>
        </div>
      )}
    </>
  )
}
export default BuzSinglePic
