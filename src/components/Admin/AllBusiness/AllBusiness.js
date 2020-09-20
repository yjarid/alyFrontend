import React, { useState, useEffect, Fragment } from "react"
import AdvanceFilter from "../../UI/AdvanceFilter/AdvanceFilter"
import { GET_BUSINESSES } from "../../../qraphQl/businessType"
import { useLazyQuery } from "@apollo/react-hooks"
import styles from "./AllBusiness.module.scss"
import TablePaginat from "../TablePaginat/TablePaginat"

export default function AllBusiness() {
  const [value, setValue] = useState(null)
  const [FilterValue, setFilterValue] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [neighborhood, setNeighborhood] = useState(null)
  const [city, setCity] = useState(null)
  const [subCat, setSubCat] = useState([])
  const [cat, setCat] = useState(null)

  useEffect(() => {
    fetchBus()
    setShowFilter(false)
  }, [FilterValue, neighborhood, JSON.stringify(subCat), city, cat])

  const [getBusiness, { data }] = useLazyQuery(GET_BUSINESSES)

  const onFilter = (initNeighborhood, initSubCat, initCity, initCat) => {
    setNeighborhood(null)
    setCity(null)
    setSubCat([])
    setFilterValue(value)

    if (initNeighborhood) {
      let parseNeigh = JSON.parse(initNeighborhood)
      setNeighborhood(parseNeigh.neigh)
    } else {
      // if neigh is not defined filter with city
      let parseCity = JSON.parse(initCity)
      setCity(parseCity.name)
    }

    if (initSubCat.length > 0) {
      setSubCat(initSubCat)
    } else {
      if (initCat) {
        setCat(initCat)
      }
    }
  }

  const fetchBus = () => {
    let variab = { first: 100, orderBy: "createdAt_DESC" }

    if (FilterValue) {
      variab = { ...variab, query: FilterValue }
    }
    // PART LOCATION
    if (neighborhood) {
      variab = { ...variab, neighborhood }
    } else {
      // if neigh is not efine we will filter by city
      if (city) {
        variab = { ...variab, city: city }
      }
    }

    // PART CATEGORY

    if (subCat.length > 0) {
      variab = { ...variab, subCat }
    }

    if (cat) {
      variab = { ...variab, cat }
    }

    getBusiness({ variables: variab })
  }

  return (
    <Fragment>
      <div className={styles.search}>
        <div className={styles.showFilterBtn} onClick={() => setShowFilter(!showFilter)}>
          Advanced Filter
        </div>
        {showFilter && (
          <Fragment>
            <input type="text" onChange={e => setValue(e.target.value)} placeholder="search" />
            <AdvanceFilter onFilter={onFilter} parentCat={cat ? cat : "restaurant"} />
          </Fragment>
        )}
      </div>

      <TablePaginat finData={data ? data.businesses : []} />
    </Fragment>
  )
}
