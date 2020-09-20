import React, { Fragment, useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"
import styles from "./LoginBtn.module.scss"
import { useMutation } from "@apollo/react-hooks"
import { loggedInUser } from "../../../../AccessToken"
import { LOGOUT } from "../../../../qraphQl/userType"
import { setAccessToken } from "../../../../AccessToken"
import { StateContext, DispatchContext } from "../../../../Context"

function LoginBtn(props) {
  const { FP } = props // allow us to change style based on where is dispalyed front page or top bar
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [logout, { client }] = useMutation(LOGOUT, {
    onCompleted() {
      setAccessToken("")
      client.resetStore()
      appDispatch({ type: "logout" })
      appDispatch({ type: "flashMessage", value: { message: "Successfully loggedout", type: "success" } })
      return <Redirect to={"/"} />
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  return (
    <div>
      {appState.user.userId ? (
        <div className={FP ? styles.btnSection : styles.btnSection2}>
          <Link to={`/profile/${appState.user.userId}`}>
            <div className={FP ? styles.btn : styles.btn2}>Profile</div>
          </Link>
          <div className={FP ? styles.btn : styles.btn2} onClick={logout}>
            LogOut
          </div>
        </div>
      ) : (
        <div className={styles.btnSection}>
          <Link to={`/login`}>
            <div className={FP ? styles.btn : styles.btn2}>Login</div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default withRouter(LoginBtn)
