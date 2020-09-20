import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { useLazyQuery } from "@apollo/react-hooks"
import { IMAGES_BUSINESS } from "../../../qraphQl/imageType"
import imageFromPicture from "../../../utils/imageFromPicture"
import ImageGrid from "../../UI/ImageGrid/ImageGrid"
import styles from "./BuzSingleImages.module.scss"
import Page from "../../Page/Page"
import queryString from "query-string"
import { DispatchContext } from "../../../Context"

function BuzSingleImages({ location }) {
  const appDispatch = useContext(DispatchContext)

  const [images, setImages] = useState([])
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true)
  const [sort, setSort] = useState("createdAt_DESC")
  const [page, setPage] = useState(0)
  const { id } = useParams()
  const REVIEW_PER_PAGE = 20

  const { name } = queryString.parse(location.search)

  const [getImages, { loading }] = useLazyQuery(IMAGES_BUSINESS, {
    onCompleted({ images }) {
      if (images.length < REVIEW_PER_PAGE) {
        // if the result fetched is less than what is requested it means there are no more data to fetch
        setShowLoadMoreBtn(false)
      }
      if (page === 0) {
        // when the order by type we need to clear the old ordering
        setImages(images)
      } else {
        setImages(prevImg => [...prevImg, ...images])
      }
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  useEffect(() => {
    getImages({ variables: { busID: id, first: REVIEW_PER_PAGE, skip: REVIEW_PER_PAGE * page, orderBy: sort, appropriate: true } })
  }, [sort, page])

  const setSortType = type => {
    setShowLoadMoreBtn(true)
    setSort(type)
    setPage(0)
  }

  const loadMoreReviews = () => {
    if (page >= 3) {
      // will allow us to load 2 times
      setShowLoadMoreBtn(false)
    }
    if (!loading && page < 4) {
      setPage(prev => prev + 1)
    }
  }

  let modalInfo = imageFromPicture(images)
  return (
    <Page withTopBar={true} title={`Images for ${name}`}>
      <h2 className="sectionTitle">Images for {name}</h2>
      <div className={styles.sortBySection}>
        <span className={styles.sortBy}>Sort by: </span>
        <span className={styles.sortByBtn} onClick={() => setSortType("score_DESC")}>
          Best
        </span>
        <span className={styles.sortByBtn} onClick={() => setSortType("createdAt_DESC")}>
          {" "}
          Newest
        </span>
      </div>
      {modalInfo && (
        <div className={styles.mainContainer}>
          <ImageGrid images={modalInfo} top={true} />
        </div>
      )}

      {showLoadMoreBtn && !loading && (
        <div className={styles.loadMoreBtncontainer}>
          <span className={styles.loadMoreBtn} onClick={loadMoreReviews}>
            Load More
          </span>
        </div>
      )}
    </Page>
  )
}

export default BuzSingleImages
