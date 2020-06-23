import React, { useState, useRef, useEffect } from "react"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_IMAGE_DESC } from "../../../../qraphQl/imageType"
import styles from "./ImageCard.module.scss"
import Spinner from "../../Spinner/Spinner"

const ImageCard = ({ singleImg, isOwner }) => {
  const myRef = useRef(null)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [displayedDesc, setDisplayedDesc] = useState(singleImg.desc)
  const [desc, setDesc] = useState("Add description")
  const [error, setError] = useState(null)
  const [updateImage, { loading }] = useMutation(UPDATE_IMAGE_DESC, {
    onCompleted({ updateImage }) {
      setIsSubmiting(false)
      setDisplayedDesc(updateImage.desc)
    },
    onError(error) {
      setError("Something went wrong try again")
    }
  })

  const descChange = e => {
    setError(null)
    let val = e.target.value
    setDesc(e.target.value)
  }

  const submitDesc = () => {
    if (isSubmiting) {
      return
    }
    setIsSubmiting(true)
    let length = desc.length

    if (length == 0) {
      setError(`Add a description`)
      setIsSubmiting(false)
    } else if (desc && length > 80) {
      setError(`Do not exceed 80 letters you are at ${length}`)
      setIsSubmiting(false)
    } else {
      updateImage({
        variables: {
          id: singleImg.picId,
          desc: desc
        }
      })
    }
  }

  useEffect(() => {
    if (!displayedDesc && isOwner) {
      myRef.current.focus()
    }
  }, [displayedDesc, isOwner])

  const editDesc = () => {
    setDesc(displayedDesc)
    setDisplayedDesc(null)
  }

  const display = () => {
    if (isOwner) {
      if (displayedDesc) {
        return (
          <div>
            <div className={styles.description}>{displayedDesc}</div>
            <span className={styles.editDescBtn} onClick={editDesc}>
              edit
            </span>
          </div>
        )
      } else {
        return (
          <div>
            <textarea ref={myRef} className={styles.textAreaDesc} onChange={descChange} value={desc} />
            {isOwner && (
              <span className={styles.btnDesc} onClick={submitDesc}>
                Done
              </span>
            )}
            {error && <p className={styles.errorDesc}>{error}</p>}
          </div>
        )
      }
    }
    if (!isOwner) {
      if (displayedDesc) {
        return <div className={styles.description}>{displayedDesc}</div>
      } else {
        return null
      }
    }
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.image}>
        <img src={singleImg.picture} alt="" width="600" height="400" />
      </div>

      <div className={styles.desc}>
        {loading && <Spinner />}
        {display()}
      </div>
    </div>
  )
}

export default ImageCard
