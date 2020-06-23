import React, { useState } from "react"
import ImageGrid from "../../../../UI/ImageGrid/ImageGrid"
import styles from "./BuzSinglePic.module.scss"
import imageFromReviews from "../../../../../utils/imageFromReviews"

function BuzSinglePic({ reviews }) {
  
  let modalInfo = imageFromReviews(reviews)


  return (
    <>
      {modalInfo  && (
        <div className={styles.mainContainer}>
          <ImageGrid images={modalInfo} top={true}  /> 
          
        </div>
      )}
    </>
  )
}
export default BuzSinglePic
