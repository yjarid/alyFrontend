import React, { useState, Fragment, useContext } from "react"
import { Link } from "react-router-dom"
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"
import { MyTextField, MyTextArea, MyButton } from "../UI/CustomFields/CustomField"
import Spinner from "../UI/Spinner/Spinner"
import DropZone from "../UI/Upload/DropZone"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_USER } from "../../qraphQl/userType"
import { UPDATE_USER } from "../../qraphQl/userType"
import { loginRequired } from "../../AccessToken"
import styles from "./EditProfile.module.scss"
import { DispatchContext } from "../../Context"
import Page from "../Page/Page"

const EditProfile = props => {
  const [updatedProfile, setUpdatedProfile] = useState(null)
  const appDispatch = useContext(DispatchContext)
  const userId = props.match.params.id

  loginRequired(props.history, appDispatch)

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId }
  })

  const [updateUser, { loading: loadingU }] = useMutation(UPDATE_USER, {
    onCompleted({ updateUser }) {
      setUpdatedProfile(updateUser)
      appDispatch({ type: "flashMessage", value: { message: `Profile updated`, type: "success" } })
      window.scrollTo(0, 0)
    },
    onError() {
      appDispatch({ type: "flashMessage", value: { message: "Somethicng is wrong please try again later", type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  let finalData = updatedProfile || (data ? data.user : null)

  if (error) {
    appDispatch({ type: "flashMessage", value: { message: "Somethicng is wrong please try again later", type: "error" } })
  }

  const form = props => {
    console.log(props)
    return (
      <div className={styles.innerContainer}>
        <Form>
          <div>
            <div>
              <Field name="picture" component={DropZone}></Field>
              {props.errors && props.errors.picture && <p>{props.errors.picture}</p>}
            </div>
            <div>
              <MyTextField disabled={false} name="userName" label="display Name" />
            </div>

            <div>
              <MyTextArea multiline rows="3" name="description" label="What's in your mind ?" />
            </div>

            <div>
              <MyTextField disabled={false} name="city" label="City" />
            </div>
          </div>

          <MyButton disabled={props.isSubmitting} type="submit">
            Submit
          </MyButton>
        </Form>
        <div className={styles.link}>
          <Link to={`/profile/${userId}`}>&lt;&lt; Back to Profile</Link>
        </div>
      </div>
    )
  }

  const EditProfileForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ userName, description, picture, city }) {
      return {
        userName: userName || "",
        description: description || "",
        picture: picture || "",
        city: city || ""
      }
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Name is required").max(30, "you should not exceed 30 character"),
      description: Yup.string().max(140, "you should not exceed 140 character"),
      city: Yup.string().max(30, "you should not exceed 30 character")
    }),

    handleSubmit: (values, { props, resetForm }) => {
      let pictureId = values.picture
      if (typeof pictureId == "string") {
        pictureId = values.picture ? values.picture.split("/images/")[1] : null
      }
      console.log(pictureId)
      updateUser({
        variables: {
          ...values,
          picture: pictureId,
          id: userId
        }
      })
    }
  })(form)
  return (
    <Page title={"Edit Profile"} withTopBar={false}>
      {(loading || loadingU) && <Spinner />}
      {finalData && !(loading || loadingU) && <EditProfileForm {...finalData} />}
    </Page>
  )
}

export default EditProfile
