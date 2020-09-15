import React, { useEffect, useContext } from "react"
import { GET_BUSINESS_WITH_REVIEWS, UPDATE_BUSINESS } from "../../../qraphQl/businessType"
import { useQuery, useMutation } from "@apollo/react-hooks"
import Spinner from "../../UI/Spinner/Spinner"
import BuzSinglePic from "./BuzSingleComp/BuzSinglePic/BuzSinglePic"
import BuzSingleHead from "./BuzSingleComp/BuzSingleHead/BuzSingleHead"
import BuzSingleDesc from "./BuzSingleComp/BuzSingleDesc/BuzSingleDesc"
import BuzSingleReviews from "./BuzSingleComp/BuzSingleReviews/BuzSingleReviews"
import { DispatchContext, StateContext } from "../../../Context"
import Page from "../../Page/Page"

function BuzSinglePage(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [updateBusiness] = useMutation(UPDATE_BUSINESS)
  const { loading, error, data } = useQuery(GET_BUSINESS_WITH_REVIEWS, {
    variables: { id: props.match.params.id, onlyOwner: false, published: true }
  })

  useEffect(() => {
    if (error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
    }
  }, [error])

  let reviews = []
  let images = []

  let business = data ? data.business : null

  if (business && business.reviews) {
    reviews = business.reviews
  }

  if (reviews.length > 0) {
    reviews.forEach(rev => {
      if (Array.isArray(rev.picture)) {
        images = [...images, ...rev.picture]
      }
    })
  }

  return (
    <Page title="Business Page" withTopBar={true}>
      {loading && <Spinner />}

      {business && <button onClick={() => updateBusiness({ variables: { id: business._id, adminOnly: true, published: !business.published } })}>{business.published ? "unpublish" : "publish"}</button>}
      {business && (
        <>
          <BuzSinglePic reviews={reviews} />
          <BuzSingleHead business={business} history={props.history} />
          <BuzSingleDesc desc={business.desc} phone={business.phone} address={business.address} />
          <BuzSingleReviews reviews={reviews} />
        </>
      )}
    </Page>
  )
}

export default BuzSinglePage
