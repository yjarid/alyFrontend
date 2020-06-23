import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Register.module.scss"
import { MyTextField, MyButton } from "../../UI/CustomFields/CustomField"
import { withFormik, Form } from "formik"
import * as Yup from "yup"

const LoginForm = ({ login, loading }) => {
  const myForm = ({ values, errors, touched, isSubmitting }) => {
    return (
      <div className={styles.topContainer}>
        <div className="container">
          <h1 className={styles.title}>Login</h1>
          <Form>
            <div className={styles.innerContainer}>
              <div>
                <MyTextField disabled={false} type="email" name="email" label="Your Email" />
              </div>
              <div>
                <MyTextField disabled={false} type="password" name="password" label="Your Password" />
              </div>

              <MyButton type="submit">Login</MyButton>
            </div>
          </Form>
          <div className={styles.note}>
            <p>
              not a menber please
              <strong>
                <Link to="/register"> Register </Link>
              </strong>
            </p>
            <p>
              <Link to="/resetPassword"> Forgot Password </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const LogFormik = withFormik({
    mapPropsToValues({ email, password }) {
      return {
        email: email || "",
        password: password || ""
      }
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email("Email not valid").required("Email is required"),
      password: Yup.string().min(6, "Password must be 6 characters or longer").max(30, "name should be at most 30 characters").required("Password is required")
    }),

    handleSubmit: (values, { setSubmitting, setFieldError }) => {
      login({ variables: values })
    }
  })(myForm)

  return <LogFormik />
}

export default LoginForm
