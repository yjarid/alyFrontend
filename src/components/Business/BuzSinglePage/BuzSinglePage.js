import React, { useContext } from "react"
import { BUSINESS_INFO, UPDATE_BUSINESS } from "../../../qraphQl/businessType"
import { useQuery, useMutation } from "@apollo/react-hooks"
import Spinner from "../../UI/Spinner/Spinner"
import BuzSinglePic from "./BuzSingleComp/BuzSinglePic/BuzSinglePic"
import BuzSingleHead from "./BuzSingleComp/BuzSingleHead/BuzSingleHead"
import BuzSingleDesc from "./BuzSingleComp/BuzSingleDesc/BuzSingleDesc"
import BuzSingleReviews from "./BuzSingleComp/BuzSingleReviews/BuzSingleReviews"
import { DispatchContext, StateContext } from "../../../Context"
import Page from "../../Page/Page"
import { useParams } from "react-router-dom"

function BuzSinglePage(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const { id } = useParams()

  const [updateBusiness] = useMutation(UPDATE_BUSINESS, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: `Business updated`, type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message, type: "success" } })
      window.scrollTo(0, 0)
    }
  })

  const { loading, data } = useQuery(BUSINESS_INFO, {
    variables: { id, onlyOwner: false, published: true },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message, type: "success" } })
      window.scrollTo(0, 0)
    }
  })

  let business = data ? data.business : null

  return (
    <Page title="Business Page" withTopBar={true}>
      {loading && <Spinner />}

      {appState.user.type === "ADMIN" && business && <button onClick={() => updateBusiness({ variables: { id: business._id, adminOnly: true, published: !business.published } })}>{business.published ? "unpublish" : "publish"}</button>}
      {business && (
        <>
          <BuzSinglePic busName={business.name} />

          <BuzSingleHead business={business} history={props.history} />
          <BuzSingleDesc desc={business.desc} phone={business.phone} address={business.address} />
          <BuzSingleReviews />
        </>
      )}
    </Page>
  )
}

export default BuzSinglePage
