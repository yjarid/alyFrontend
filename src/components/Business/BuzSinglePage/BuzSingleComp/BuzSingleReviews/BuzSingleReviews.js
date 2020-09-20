import React, { useEffect, useState, useContext } from "react"
import styles from "./BuzSingleReviews.module.scss"
import ReviewCard from "../../../../UI/Cards/ReviewCard/ReviewCard"
import { useLazyQuery } from "@apollo/react-hooks"
import { useParams } from "react-router-dom"
import Spinner from "../../../../UI/Spinner/Spinner"
import { DispatchContext } from "../../../../../Context"
import { REVIEWS_BUSINESS } from "../../../../../qraphQl/reviewType"

function BuzSingleReviews() {
  const appDispatch = useContext(DispatchContext)

  const [finalReviews, setReviews] = useState([])
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true)
  const [showSortByBtn, setShowshowSortByBtn] = useState(true)
  const [sort, setSort] = useState("createdAt_DESC")
  const [page, setPage] = useState(0)
  const { id } = useParams()
  const REV_PER_PAGE = 20

  const [getReviews, { loading, data }] = useLazyQuery(REVIEWS_BUSINESS, {
    onCompleted({ reviews }) {
      if (reviews.length < REV_PER_PAGE && page === 0) {
        // if just few reviews are available no need to show sort functionalities if page get to more than 1 it means we have a good number of reviews
        setShowshowSortByBtn(false)
      }
      if (reviews.length < REV_PER_PAGE) {
        // if the result fetched is less than what is requested it means there are no more data to fetch
        setShowLoadMoreBtn(false)
      }
      if (page === 0) {
        // when the order by type we need to clear the old ordering
        setReviews(reviews)
      } else {
        setReviews(prevRev => [...prevRev, ...reviews])
      }
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  useEffect(() => {
    getReviews({ variables: { busID: id, first: REV_PER_PAGE, skip: REV_PER_PAGE * page, orderBy: sort } })
  }, [sort, page])

  const setSortType = type => {
    setShowLoadMoreBtn(true)
    setSort(type)
    setPage(0)
  }

  const loadMoreReviews = () => {
    if (page >= 1) {
      // will allow us to load 2 times
      setShowLoadMoreBtn(false)
    }
    if (!loading && page < 2) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <div className={styles.mainBody}>
      <h2 className="sectionTitle">Reviews</h2>
      {showSortByBtn && (
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
      )}
      {finalReviews.map(rev => (
        <ReviewCard review={rev} key={rev._id} />
      ))}
      {showLoadMoreBtn && !loading && (
        <div className={styles.loadMoreBtncontainer}>
          <span className={styles.loadMoreBtn} onClick={loadMoreReviews}>
            Load More
          </span>
        </div>
      )}
      {loading && <Spinner />}
    </div>
  )
}

export default BuzSingleReviews
