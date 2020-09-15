import React, { useContext } from "react"
import ReviewCard from "../../UI/Cards/ReviewCard/ReviewCard"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_REVIEW, UPDATE_REVIEW } from "../../../qraphQl/reviewType"
import { StateContext } from "../../../Context"
import FeaturedReviewTemplate from "../../UI/Cards/ReviewCard/FeaturedReview/FeaturedReviewTemplate/FeaturedReviewTemplate"
import styles from "./SingleReviewPage.module.scss"
import Page from "../../Page/Page"

function SingleReviewPage(props) {
  // this par is only for admin rating of reviews
  const appState = useContext(StateContext)

  const [updateReview] = useMutation(UPDATE_REVIEW)
  const { loading, error, data } = useQuery(GET_REVIEW, {
    variables: { id: props.match.params.id }
  })

  let review = data ? data.review : null

  return (
    <>
      <Page title="Single Review" withTopBar={true}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>{review && <FeaturedReviewTemplate rev={review} isAdmin={appState.user.type == "ADMIN"} updateReview={updateReview} />}</div>
        </div>
      </Page>
    </>
  )
}

export default SingleReviewPage
