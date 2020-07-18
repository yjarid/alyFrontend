import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import styles from "./Forms/Register.module.scss"
import { MyTextField, MyButton } from "../UI/CustomFields/CustomField"
import { withFormik, Form } from "formik"
import Spinner from "../UI/Spinner/Spinner"
import * as Yup from "yup"
import instance from "../../axios/axios"
import { DispatchContext } from "../../Context"
import Page from "../Page/Page"

const ResetPassword = () => {
  const appDispatch = useContext(DispatchContext)

  const [loading, setLoading] = useState(false)

  const myForm = () => {
    return (
      <>
        <h1 className={styles.title}>Reset Password</h1>
        <Form>
          <div className={styles.innerContainer}>
            <div>
              <MyTextField disabled={false} type="email" name="email" label="Your Email" />
            </div>

            <MyButton type="submit">Reset</MyButton>
          </div>
          {loading && <Spinner />}
        </Form>
        <p className={styles.note}>
          not a menber please{" "}
          <strong>
            <Link to="/register"> Register </Link>
          </strong>{" "}
        </p>
      </>
    )
  }

  const ResetForm = withFormik({
    mapPropsToValues({ email }) {
      return {
        email: email || ""
      }
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email("Email not valid").required("Email is required")
    }),

    handleSubmit: (values, { setSubmitting, setFieldError }) => {
      instance
        .post("/reset-password", values)
        .then(res => {
          appDispatch({ type: "flashMessage", value: { message: `hello ${res.data.userName} a link was sent to your email to reset your password`, type: "success" } })
        })
        .catch(err => {
          appDispatch({ type: "flashMessage", value: { message: err.response.data.message, type: "error" } })
        })
    }
  })(myForm)
  return (
    <Page title="Reset Password" withTopBar={true}>
      <ResetForm />
    </Page>
  )
}

export default ResetPassword
