import React, { useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_LOCATION, DELETE_LOCATION, CREATE_LOCATION } from "../../../../qraphQl/taxonomyType"
import FlashMessage from "../../../UI/FlashMessage/FlashMessage"
import Spinner from "../../../UI/Spinner/Spinner"
import styles from "./PreviewLocation.module.scss"
import LocationForm from "./LocationForm/LocationForm"
import { DispatchContext } from "../../../../Context"

export default function PreviewLocation({ location = {}, type, cities }) {
  const { _id, name } = location
  const appDispatch = useContext(DispatchContext)

  const [updateLocation, { loading }] = useMutation(UPDATE_LOCATION, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: "Location updated ", type: "success" } })
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: "error", type: "error" } })
    }
  })

  const [createLocation] = useMutation(CREATE_LOCATION, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: "Location created ", type: "success" } })
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: "error", type: "error" } })
    }
  })

  const [deleteLocation, { loading: loadingDel }] = useMutation(DELETE_LOCATION, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: "Location Deleted ", type: "success" } })
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: "error", type: "error" } })
    }
  })

  const display = () => {
    let body = null
    if (loading || loadingDel) {
      body = <Spinner />
    } else {
      if (type == "edit") {
        body = (
          <div className={styles.container}>
            <h3 className={styles.formTitle}>Edit </h3>
            <LocationForm onSubmit={updateLocation} {...location} id={_id} cities={cities} />
          </div>
        )
      } else {
        body = (
          <div className={styles.container}>
            <h3 className={styles.formTitle}>New </h3>
            <LocationForm onSubmit={createLocation} cities={cities} />
          </div>
        )
      }
    }

    return body
  }

  const deleteLoc = _id => {
    deleteLocation({ variables: { _id } })
  }

  return (
    <div>
      {display()}
      <button onClick={deleteLoc}> delete</button>
      <button>
        {" "}
        <span className={styles.edit}>Edit</span>
      </button>
    </div>
  )
}
