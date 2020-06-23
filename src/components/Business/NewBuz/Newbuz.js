import React, { useContext } from "react"
import BuzForm from "./BuzForm/BuzForm"
import { useMutation } from "@apollo/react-hooks"
import styles from "./Newbuz.module.scss"
import Spinner from "../../UI/Spinner/Spinner"
import { CREATE_BUSINESS } from "../../../qraphQl/businessType"
import { loginRequired } from "../../../AccessToken"
import { DispatchContext } from "../../../Context"
import Page from "../../Page/Page"

const NewBuz = props => {
  const appDispatch = useContext(DispatchContext)

  loginRequired(props.history, appDispatch)

  const [createBusiness, { loading }] = useMutation(CREATE_BUSINESS, {
    onCompleted({ createBusiness }) {
      appDispatch({ type: "flashMessage", value: { message: `Business ${createBusiness.name} is created`, type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(err) {
      console.log(err.message)
      appDispatch({ type: "flashMessage", value: { message: "Somethicng is wrong please try again later", type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  return (
    <Page title="Create New Business" withTopBar={false}>
      {loading && <Spinner />}
      <h3 className={styles.formTitle}>Create New Business</h3>
      <BuzForm onSubmit={createBusiness} />
    </Page>
  )
}

export default NewBuz
