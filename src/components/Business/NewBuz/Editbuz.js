import React, { useEffect, useContext, useState } from "react"
import BuzForm from "./BuzForm/BuzForm"
import styles from "./Newbuz.module.scss"
import Page from "../../Page/Page"
import Spinner from "../../UI/Spinner/Spinner"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { UPDATE_BUSINESS, GET_BUSINESS } from "../../../qraphQl/businessType"
import { loginRequired } from "../../../AccessToken"
import { StateContext, DispatchContext } from "../../../Context"

const EditBuz = props => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [updatedBus, setUpdatedBus] = useState(null)

  loginRequired(props.history, appDispatch)

  const id = props.match.params.id

  const { loading, error, data } = useQuery(GET_BUSINESS, {
    variables: { id, onlyOwner: true }
  })

  useEffect(() => {
    if (error) {
      appDispatch({ type: "flashMessage", value: { message: "Somethicng is wrong please try again later", type: "error" } })
    }
  }, [error])

  const [updateBusiness] = useMutation(UPDATE_BUSINESS, {
    onCompleted({ updateBusiness }) {
      setUpdatedBus(updateBusiness)
      appDispatch({ type: "flashMessage", value: { message: `Business ${updateBusiness.name} is updated`, type: "success" } })
      window.scrollTo(0, 0)
    },
    onError() {
      appDispatch({ type: "flashMessage", value: { message: "Somethicng is wrong please try again later", type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  const upublishBus = () => {
    updateBusiness({ variables: { id, published: false } })
  }

  if (loading) {
    return <Spinner />
  }

  let finalData = updatedBus || (data ? data.business : null)

  return (
    <Page title="Edit Business" withTopBar={false}>
      {finalData && (
        <>
          {appState.user.type === "ADMIN" && data.business.published && (
            <div className={styles.unpublish} onClick={upublishBus}>
              Unpublish
            </div>
          )}

          <h3 className={styles.formTitle}>Edit {finalData.name}</h3>
          <BuzForm onSubmit={updateBusiness} {...finalData} id={id} />
        </>
      )}
    </Page>
  )
}

export default EditBuz
