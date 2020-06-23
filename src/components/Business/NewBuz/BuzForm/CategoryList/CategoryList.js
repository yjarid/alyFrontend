import React, { Component } from "react"
import { Checkbox } from "@material-ui/core"
import styles from "./CategoryList.module.scss"
import { MyButton } from "../../../../UI/CustomFields/CustomField"
import { upCaseFirstLetter } from "../../../../../utils/string"

const CategoryList = props => {
  const handleSelectedCategory = e => {
    const type = e.target.getAttribute("name")
    const val = e.target.getAttribute("value")

    props.onSelected(val.toLowerCase(), type)
  }

  const handleSelectedSubcategory = async e => {
    e.preventDefault()
    const form = document.getElementById("subCategory")
    const checkbox = form.getElementsByTagName("INPUT")
    const selectedSubcategories = []
    let i = 0
    let k = 0

    // Loop and push the checked CheckBox value in Array.
    do {
      if (checkbox[i].checked) {
        selectedSubcategories.push(checkbox[i].value.toLowerCase())
        k++
      }
      i++
    } while (i < checkbox.length && k < 3)

    props.onSelected(selectedSubcategories, "subCat")
  }

  const renderCategoryList = () => {
    let isLocation = typeof props.categoryList.locations != "undefined" ? true : false

    const lists = isLocation ? props.categoryList.locations : props.categoryList.categories
    const parent = lists.filter(item => item.cat === "city" || item.cat === "buz01")
    const child = lists.filter(item => item.cat === "neighborhood" && item.group === props.parentVal)
    const res = props.type === "neighborhood" ? child : parent

    return (
      <div>
        <h1 className={styles.title}> Select a {props.type} </h1>
        <div className={styles.checkboxContainer}>
          {res.map((cat, i) => {
            let catName = upCaseFirstLetter(cat.name)
            return (
              <div key={i}>
                <label className={styles.container}>
                  {catName}
                  <input type="checkbox" value={isLocation ? cat.neigh : catName} name={props.type} checked={catName === props.selected} onChange={handleSelectedCategory} />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderSubcategoryList = () => {
    const res = props.categoryList.categories.filter(item => item.group === props.parentVal && item.cat == "buz02")

    return (
      <div>
        <div>
          <h1 className={styles.title}>Select {props.type} (Max 3)</h1>
        </div>
        <form id="subCategory" onSubmit={handleSelectedSubcategory}>
          <div className={styles.checkboxContainer}>
            {res.map((cat, i) => {
              let catName = upCaseFirstLetter(cat.name) // to captalize values
              return (
                <label className={styles.container}>
                  {catName}
                  <input type="checkbox" value={catName} name="subCat" />
                  <span className={styles.checkmark}></span>
                </label>
              )
            })}
          </div>
          <MyButton type="submit">Select</MyButton>
        </form>
      </div>
    )
  }

  const finalRender = () => {
    if (props.categoryList) {
      if (props.type !== "subCat") {
        return renderCategoryList()
      } else {
        return renderSubcategoryList()
      }
    }
    return null
  }

  return finalRender()
}

export default CategoryList
