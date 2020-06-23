import React, { useState, useContext } from "react"
import styles from "./Forms/Register.module.scss"
import { MyTextField, MyButton } from "../UI/CustomFields/CustomField"
import { withFormik, Form } from "formik"
import Spinner from "../UI/Spinner/Spinner"
import { useParams } from "react-router-dom"
import queryString from "query-string"
import * as Yup from "yup"
import { useMutation } from "@apollo/react-hooks"
import { CHANGE_PASS } from "../../qraphQl/userType"
import { DispatchContext } from "../../Context"
import Page from "../Page/Page"

const ChangePassword = props => {
  const [genError, setGenError] = useState([])
  let { id } = useParams()
  const { token } = queryString.parse(props.location.search)
  const appDispatch = useContext(DispatchContext)

  const [changePass, { loading }] = useMutation(CHANGE_PASS, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: "Your password sucessfuly changed please Login", type: "success" } })
      props.history.push("/login")
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
    }
  })

  const myForm = ({ values, errors, touched, isSubmitting }) => {
    return (
      <>
        <h1 className={styles.title}>Change your Password</h1>
        <Form>
          <div className={styles.innerContainer}>
            <div>
              <MyTextField disabled={false} type="password" name="pass" label="New Password" />
            </div>

            <div>
              <MyTextField disabled={false} type="password" name="confPass" label="Confirm Password" />
            </div>
            {genError &&
              genError.map((err, i) => {
                return (
                  <p key={i} className={styles.generalError}>
                    {err.replace("GraphQL error:", "")}
                  </p>
                )
              })}
            <MyButton type="submit">Change Pass</MyButton>
          </div>
          {loading && <Spinner />}
        </Form>
      </>
    )
  }

  const ResetForm = withFormik({
    mapPropsToValues({ pass, confPass }) {
      return {
        pass: pass || "",
        confPass: confPass || ""
      }
    },

    validationSchema: Yup.object().shape({
      pass: Yup.string().min(6, "Password must be 6 characters or longer").max(30, "name should be at most 30 characters").required("Password is required"),
      confPass: Yup.string()
        .min(6, "Password must be 6 characters or longer")
        .oneOf([Yup.ref("pass"), null], "Passwords must match")
        .max(30, "name should be at most 30 characters")
        .required("Password is required")
    }),

    handleSubmit: (values, { setSubmitting, setFieldError }) => {
      setGenError([])
      changePass({
        variables: {
          id,
          token,
          password: values.pass
        }
      })
    }
  })(myForm)
  return (
    <Page title="Change Pass" withTopBar={true}>
      <ResetForm />
    </Page>
  )
}

export default ChangePassword
