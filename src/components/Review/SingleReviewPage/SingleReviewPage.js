import React, { useContext } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_REVIEW, UPDATE_REVIEW } from "../../../qraphQl/reviewType"
import { StateContext, DispatchContext } from "../../../Context"
import FeaturedReviewTemplate from "../../UI/Cards/ReviewCard/FeaturedReview/FeaturedReviewTemplate/FeaturedReviewTemplate"
import styles from "./SingleReviewPage.module.scss"
import Page from "../../Page/Page"

function SingleReviewPage(props) {
  // this par is only for admin rating of reviews
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [updateReview] = useMutation(UPDATE_REVIEW, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: "Thank you, Review updated", type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })
  const { loading, data } = useQuery(GET_REVIEW, {
    variables: { id: props.match.params.id, appropriate: true },

    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
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
