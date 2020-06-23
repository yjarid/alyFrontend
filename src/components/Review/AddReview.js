import React, { useContext } from "react"
import ReviewForm from "./ReviewForm"
import { useMutation } from "@apollo/react-hooks"
import Spinner from "../UI/Spinner/Spinner"
import { CREATE_REVIEW } from "../../qraphQl/reviewType"
import { DispatchContext } from "../../Context"

const AddReview = ({ businessId, setBuzStat, modalClosed }) => {
  const appDispatch = useContext(DispatchContext)

  const [createReview, { loading, error }] = useMutation(CREATE_REVIEW, {
    onCompleted({ createReview }) {
      setBuzStat(createReview.business)
      appDispatch({ type: "flashMessage", value: { message: "Thank you, Review created", type: "success" } })
      modalClosed()
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: `Review Not Added: ${error.message.replace("GraphQL error:", "")}`, type: "error" } })
      modalClosed()
      window.scrollTo(0, 0)
    }
  })

  return (
    <div>
      {loading && <Spinner />}
      <h2>Add a review</h2>
      <ReviewForm onSubmit={createReview} businessId={businessId} />
    </div>
  )
}

export default AddReview
