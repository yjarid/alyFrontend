import React, { useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_CATEGORY, DELETE_CATEGORY, CREATE_CATEGORY } from "../../../../qraphQl/taxonomyType"
import Spinner from "../../../UI/Spinner/Spinner"
import styles from "./PreviewCategory.module.scss"
import CategoryForm from "./CategoryForm/CategoryForm"
import { DispatchContext } from "../../../../Context"

export default function PreviewCategory({ subCat = {}, type, categories }) {
  const { _id, name } = subCat

  const appDispatch = useContext(DispatchContext)

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: `Category created`, type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(err) {
      appDispatch({ type: "flashMessage", value: { message: err.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: "Category created ", type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: "error", type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  const [deleteCategory, { loading: loadingDel }] = useMutation(DELETE_CATEGORY, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: "Category deleted ", type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: "error", type: "error" } })
      window.scrollTo(0, 0)
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
            <CategoryForm onSubmit={updateCategory} {...subCat} id={_id} categories={categories} />
          </div>
        )
      } else {
        body = (
          <div className={styles.container}>
            <h3 className={styles.formTitle}>New </h3>
            <CategoryForm onSubmit={createCategory} categories={categories} />
          </div>
        )
      }
    }

    return body
  }

  const deleteLoc = _id => {
    deleteCategory({ variables: { _id } })
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
