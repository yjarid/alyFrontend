import React, { useState, useEffect, useContext } from "react"
import { withFormik, Form, FieldArray, Field } from "formik"
import * as Yup from "yup"
import styles from "./BuzForm.module.scss"
import Modal from "../../../UI/Modal/Modal"
import Spinner from "../../../UI/Spinner/Spinner"
import CategoryList from "./CategoryList/CategoryList"
import { Button } from "@material-ui/core"
import { MyTextField, MyTextArea, MyButton, MySelect } from "../../../UI/CustomFields/CustomField"
import { useLazyQuery } from "@apollo/react-hooks"
import { LOCATIONS, CATEGORIES } from "../../../../qraphQl/taxonomyType"
import DropZone from "../../../UI/Upload/DropZone"
import { DispatchContext } from "../../../../Context"

const BuzForm = props => {
  const { values } = props
  const appDispatch = useContext(DispatchContext)
  const [modal, setModal] = useState(false)
  const [type, setType] = useState("")
  const [errorForm, setError] = useState("")

  const [getLocation, { loading, error, data }] = useLazyQuery(LOCATIONS)
  if (error) console.log(error.message)
  const [getCategory, { data: dataC }] = useLazyQuery(CATEGORIES)

  useEffect(() => {
    getLocation()
    getCategory()
  }, [])

  const modalClosed = () => {
    setModal(() => false)
    setError(null)
  }

  const selectCity = () => {
    setModal(true)
    setType("city")
  }

  const selectNeighborhood = () => {
    if (values.city == "") {
      appDispatch({ type: "flashMessage", value: { message: `you have to select a city`, type: "error" } })
      window.scrollTo(0, 0)
    } else {
      setModal(true)
      setType("neighborhood")
    }
  }

  const selectCategory = () => {
    setModal(true)
    setType("category")
  }

  const selectSubcategory = () => {
    if (values.cat == "") {
      appDispatch({ type: "flashMessage", value: { message: `you have to select a category`, type: "error" } })
      window.scrollTo(0, 0)
    } else {
      setModal(true)
      setType("subCat")
    }
  }

  const HandleTaxonomy = (val, type) => {
    setModal(false)
    switch (type) {
      case "city":
        props.setFieldValue("city", val)
        props.setFieldValue("neighborhood", "")
        break
      case "neighborhood":
        props.setFieldValue("neighborhood", val)
        break
      case "category":
        props.setFieldValue("cat", val)
        props.setFieldValue("subCat", "")
        break
      case "subCat":
        console.log(val)
        props.setFieldValue("subCat", val)
        break
      default:
        break
    }
  }

  return (
    <div>
      <Modal show={modal} modalClosed={modalClosed}>
        {loading && <Spinner />}
        <CategoryList type={type} categoryList={type === "city" || type === "neighborhood" ? data : dataC} onSelected={HandleTaxonomy} parentVal={type === "neighborhood" ? values.city.toLowerCase() : values.cat.toLowerCase()} />
      </Modal>

      <Form>
        <div className={styles.innerContainer}>
          <div>
            <Field name="picture" component={DropZone}></Field>
          </div>
          <div>
            <MyTextField disabled={false} name="name" label="Business Name" />
          </div>

          <div>
            <MyTextArea multiline rows="2" name="excerpt" label="Brand your self with a short descrption " />
          </div>

          <div>
            <MyTextArea multiline rows="4" name="desc" label="Business Description" />
          </div>

          <div>
            <MyTextField disabled={false} name="address" label="Business Address" />
          </div>

          <div>
            <MyTextField disabled={false} name="phone" label="Business Phone number" />
          </div>

          <div>
            <MyTextField disabled={false} name="latitude" label="Latitude" />
          </div>

          <div>
            <MyTextField disabled={false} name="longitude" label="Longitude" />
          </div>

          <div>
            <MySelect name="price" label="Price" option={["$", "$$", "$$$", "$$$$"]} />
          </div>
        </div>

        <h3 className={styles.taxTitle}>Business Location Information</h3>
        <div className={styles.taxGrid}>
          <div>
            <MyTextField disabled={true} label="City" name="city" className={styles.disabledField} />
            <div className={styles.button}>
              <MyButton variant="outlined" color="primary" disableRipple onClick={selectCity}>
                Select city{" "}
              </MyButton>
            </div>
          </div>

          <div>
            <MyTextField disabled={true} name="neighborhood" label="Neighborhood" />
            <MyButton variant="outlined" color="primary" onClick={selectNeighborhood}>
              Select Neighborhood{" "}
            </MyButton>
          </div>
        </div>

        <h3 className={styles.taxTitle}> Business Category Information</h3>
        <div className={styles.taxGrid}>
          <div>
            <MyTextField disabled={true} name="cat" label="Category" />
            <MyButton variant="outlined" color="primary" onClick={selectCategory}>
              Select Category{" "}
            </MyButton>
          </div>

          <div>
            <FieldArray
              name="subCat"
              render={arrayHelpers => (
                <div>
                  {values.subCat && values.subCat.length > 0
                    ? values.subCat.map((SC, index) => (
                        <div key={index} className={styles.subCatGrid}>
                          <MyTextField disabled={true} label="Sub Category" name={`subCat.${index}`} value={SC} />
                          <Button color="secondary" onClick={() => arrayHelpers.remove(index)}>
                            Remove{" "}
                          </Button>
                        </div>
                      ))
                    : null}
                </div>
              )}
            />
            <MyButton variant="outlined" color="primary" onClick={selectSubcategory}>
              Select Sub Category{" "}
            </MyButton>
          </div>
        </div>

        <MyButton disabled={props.isSubmitting} type="submit">
          Submit
        </MyButton>
      </Form>
    </div>
  )
}

const BusinessForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues({ name, desc, excerpt, picture, address, city, neighborhood, cat, subCat, location, price, phone }) {
    return {
      name: name ? name : "",
      desc: desc || "",
      excerpt: excerpt || "",
      price: price || "",
      picture: picture || "",
      address: address || "",
      latitude: location ? String(location.coordinates[1]) : "",
      longitude: location ? String(location.coordinates[0]) : "",
      city: city ? city : "",
      neighborhood: neighborhood ? neighborhood : "",
      cat: cat ? cat : "",
      subCat: subCat || "",
      phone: phone || ""
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required").max(60, "should be at most 60 characters"),
    desc: Yup.string().max(500, "should be at most 500 characters"),
    excerpt: Yup.string().max(120, "should be at most 120 characters"),
    address: Yup.string().max(200, "should be at most 200 characters"),
    city: Yup.string().required("City is required"),
    neighborhood: Yup.string().required("Neighborhood is required"),
    cat: Yup.string().required("Category is required"),
    subCat: Yup.string(),
    phone: Yup.string()
  }),

  handleSubmit: (values, { props, resetForm }) => {
    let pictureId = values.picture
    console.log(pictureId)
    if (typeof pictureId == "string") {
      pictureId = values.picture ? values.picture.split("/images/")[1] : null
    }
    let descLenght = values.desc.length
    let excerpt = values.excerpt

    if (!excerpt && descLenght) {
      if (descLenght >= 120) {
        excerpt = values.desc.substring(0, 115).concat("...")
      } else {
        excerpt = values.desc
      }
    }

    props.onSubmit({ variables: { ...values, name: values.name.toLowerCase(), picture: pictureId, id: props.id, excerpt } })
  }
})(BuzForm)

export default BusinessForm
