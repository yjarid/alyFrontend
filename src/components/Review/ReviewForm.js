import React from "react"
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"
import styles from "./ReviewForm.module.scss"
import Rating from "@material-ui/lab/Rating"
import { MyTextArea, MyButton } from "../UI/CustomFields/CustomField"
import DropZoneMultiple from "../UI/Upload/DropZoneMultiple"

const ReviewForm = ({ onSubmit, businessId }) => {
  const myForm = ({ values, errors, touched, setFieldValue }) => {
    return (
      <div className={styles.topContainer}>
        <div className={styles.container}>
          <Form>
            <div className={styles.innerContainer}>
              <div>
                <Rating
                  name="rating"
                  value={values.rating}
                  onChange={(event, newValue) => {
                    setFieldValue("rating", newValue)
                  }}
                />
                {errors.rating && <p className={styles.error}> please add a rating</p>}
              </div>
              <div>
                <MyTextArea multiline rows="4" name="text" label="Business Description" />
              </div>

              <div className={styles.dropZone}>
                <Field name="picture" component={DropZoneMultiple}></Field>
              </div>

              <MyButton type="submit">Send Review</MyButton>
            </div>
          </Form>
        </div>
      </div>
    )
  }

  const RevFormik = withFormik({
    mapPropsToValues({ rating, text, picture }) {
      return {
        rating: rating || null,
        text: text || "",
        picture: picture || []
      }
    },

    validationSchema: Yup.object().shape({
      rating: Yup.number().required("Email is required"),
      text: Yup.string().max(800, "review too long")
    }),

    handleSubmit: (values, { setSubmitting, setFieldError }) => {
      onSubmit({ variables: { ...values, business: businessId } })
    }
  })(myForm)

  return <RevFormik />
}

export default ReviewForm
