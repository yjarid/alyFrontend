import React, { useEffect, useState, useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import LoginForm from "./Forms/LoginForm"
import { setAccessToken } from "../../AccessToken"
import Spinner from "../UI/Spinner/Spinner"
import queryString from "query-string"
import { LOGIN } from "../../qraphQl/userType"
import { DispatchContext } from "../../Context"
import Page from "../Page/Page"

export default function Login(props) {
  const appDispatch = useContext(DispatchContext)
  const parsed = queryString.parse(props.location.search)

  useEffect(() => {
    if (parsed) {
      if (parsed.confirm) {
        appDispatch({ type: "flashMessage", value: { message: "Your acount is active please Login", type: "success" } })
      }
    }
  }, [])

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      setAccessToken(login.token)
      appDispatch({ type: "flashMessage", value: { message: "Login successful", type: "success" } })
      appDispatch({ type: "login", value: { userId: login.user._id, type: login.user.type } })
      props.history.push("/")
    },
    onError(error) {
      const errMessage = error.message.replace("GraphQL error:", "")
      appDispatch({ type: "flashMessage", value: { message: errMessage, type: "error" } })
    }
  })

  return (
    <Page title="Loging In" withTopBar={true}>
      <LoginForm login={login} />
      {loading && <Spinner />}
    </Page>
  )
}
