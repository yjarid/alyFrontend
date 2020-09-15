import React, { useContext } from "react"
import dataToAdd from "./dataToAdd.json"
import { CREATE_BUSINESS } from "../../../qraphQl/businessType"
import { useMutation } from "@apollo/react-hooks"
import { DispatchContext } from "../../../Context"

export default function AddNewBus() {
  const appDispatch = useContext(DispatchContext)

  const [createBusiness, { loading }] = useMutation(CREATE_BUSINESS, {
    onCompleted({ createBusiness }) {
      appDispatch({ type: "flashMessage", value: { message: `Business ${createBusiness.name} is created`, type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(err) {
      appDispatch({ type: "flashMessage", value: { message: "Somethicng is wrong please try again later", type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  const addNew = () => {
    dataToAdd.data.forEach(el => {
      let subcategory = []
      if (el.subCat1) {
        subcategory.push(el.subCat1)
        delete el.subCat1
      }
      if (el.subCat2) {
        subcategory.push(el.subCat2)
        delete el.subCat2
      }
      if (el.subCat3) {
        subcategory.push(el.subCat3)
        delete el.subCat3
      }
      el.subCat = subcategory

      createBusiness({ variables: el })
    })
  }

  return (
    <div>
      <button onClick={() => addNew()}>Add new businesses</button>
    </div>
  )
}
