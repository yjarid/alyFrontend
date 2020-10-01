import React, { useContext } from "react"
import { Link } from "react-router-dom"
import styles from "./Register.module.scss"
import { withFormik, Form } from "formik"
import { MyTextField, MyButton } from "../../UI/CustomFields/CustomField"
import * as Yup from "yup"
import Recaptcha from "react-recaptcha"
import { DispatchContext } from "../../../Context"

const RegisterForm = ({ register, loading }) => {
  const appDispatch = useContext(DispatchContext)

  const myForm = ({ values, errors, touched, isSubmitting, setFieldValue }) => {
    return (
      <div className={styles.topContainer}>
        <div className="container">
          <h1 className={styles.title}>Registration</h1>
          <Form>
            <div className={styles.innerContainer}>
              <div>
                <MyTextField disabled={false} name="userName" label="Your Name" />
              </div>

              <div>
                <MyTextField disabled={false} type="email" name="email" label="Your Email" />
              </div>

              <div>
                <MyTextField disabled={false} type="password" name="password" label="Password" />
              </div>
              <Recaptcha
                sitekey="6LcA27IZAAAAAONh09JBYrX0fcz_wOdELDvJ6T7k"
                render="explicit"
                theme="light"
                verifyCallback={response => {
                  setFieldValue("recaptcha", response)
                }}
                onloadCallback={() => {
                  console.log("done loading!")
                }}
              />
              <MyButton type="submit">Register</MyButton>
            </div>
          </Form>

          <p className={styles.note}>
            Already a Member please{" "}
            <strong>
              <Link to="/login"> Login </Link>
            </strong>{" "}
          </p>
        </div>
      </div>
    )
  }

  const RegFormik = withFormik({
    mapPropsToValues({ userName, email, password }) {
      return {
        userName: userName || "",
        email: email || "",
        password: password || ""
      }
      // connect()
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().min(4, "name should be at least 4 characters").max(16, "name should be at most 16 characters").required("Name is required"),
      email: Yup.string().email("Email not valid").required("Email is required"),
      password: Yup.string().min(6, "Password must be 6 characters or longer").max(30, "name should be at most 30 characters").required("Password is required")
    }),
    handleSubmit: values => {
      if (!values.recaptcha || typeof values.recaptcha != "string") {
        appDispatch({ type: "flashMessage", value: { message: "Are you a robot :-) ?", type: "error" } })
      } else {
        register({ variables: values })
      }
    }
  })(myForm)

  return <RegFormik />
}

export default RegisterForm
