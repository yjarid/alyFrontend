import React, { useState, useRef, useEffect } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import SearchReslist from "./SearchResList/SearchReslist"
import styles from "./SearchFilter.module.scss"
import { GET_BUSINESSES } from "../../../qraphQl/businessType"
import { LOCATIONS } from "../../../qraphQl/taxonomyType"
import { withRouter } from "react-router-dom"
import inputError from "../../../cssTransition/inputError.module.scss"
import { CSSTransition } from "react-transition-group"

const SearchFilter = ({ history, FP }) => {
  const [nameErr, setNameErr] = useState({ message: "", status: false })
  const [locationErr, setLocationErr] = useState({ message: "", status: false })
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("") //the user should select a location in order to submit a search
  const [selectedLocationCat, setSelectedLocationCat] = useState() // Neighborhood or city
  const [busSug, setBusSug] = useState(null)
  const [locSug, setLocSug] = useState(null)
  const [nameCount, setNameCount] = useState(0)
  const [locationCount, setLocationCount] = useState(0)
  const [doFetch, setDoFetch] = useState(true)

  // QUERIES
  const [getBusiness] = useLazyQuery(GET_BUSINESSES, {
    onCompleted({ businesses }) {
      setNameErr({ message: "", status: false })
      setBusSug(() => businesses)
    },
    onError(error) {}
  })
  const [getLocation] = useLazyQuery(LOCATIONS, {
    onCompleted({ locations }) {
      setLocationErr({ message: "", status: false })
      setLocSug(() => locations)
    },
    onError(error) {}
  })

  // Name Filter
  const handleNameChange = event => {
    if (!doFetch) {
      setDoFetch(true)
    }
    const val = event.target.value
    if (!val || val === "") {
      setBusSug(null)
      setNameErr({ message: "", status: false })
    }
    setName(val)
  }

  const handleNameBlur = () => {
    setTimeout(() => setBusSug(null), 300)
  }

  useEffect(() => {
    if (name != "" && doFetch) {
      const delay = setTimeout(() => setNameCount(prev => prev + 1), 1000)
      return () => clearTimeout(delay)
    }
  }, [name])

  useEffect(() => {
    if (nameCount) {
      getBusiness({ variables: { query: name, first: 10, published: true } })
    }
  }, [nameCount])

  // Location Filter

  const handleLocationChange = event => {
    const val = event.target.value
    if (!doFetch) {
      setDoFetch(true)
    }

    if (!val || val === "") {
      setLocSug(null)
      setLocationErr({ message: "", status: false })
    }
    setSelectedLocation("")
    setLocation(val)
  }

  const handleLocationBlur = () => {
    setTimeout(() => setLocSug(null), 300)
  }

  useEffect(() => {
    if (location != "" && doFetch) {
      const delay = setTimeout(() => setLocationCount(prev => prev + 1), 1000)
      return () => clearTimeout(delay)
    }
  }, [location])

  useEffect(() => {
    if (locationCount) {
      getLocation({ variables: { query: location } })
    }
  }, [locationCount])

  // handle when you select a business or a location

  const selectSearchVal = (val, name, cat) => {
    setDoFetch(false)
    if (name == "name") {
      setName(val)
      setBusSug(null)
    } else if (name == "location") {
      setLocation(val)
      setSelectedLocation(val)
      setLocSug(null)
      setSelectedLocationCat(cat)
    }
  }

  // handle when you submit form
  const handleSearchSubmit = e => {
    e.preventDefault()

    if (!name) {
      setNameErr({ message: "Please enter a name", status: true })
    } else if (!selectedLocation) {
      setLocationErr({ message: "Please select a location", status: true })
    } else if (name && selectedLocation) {
      history.push({
        pathname: "/search",
        search: `?name=${name}&location=${location}&locCat=${selectedLocationCat}`
      })
    }
  }

  return (
    <div className="">
      <form onSubmit={handleSearchSubmit}>
        <div className={styles.searchFormContainer}>
          <div className={styles.searchFormSection}>
            <input className={FP ? styles.searchInput : styles.searchInput2} type="text" name="name" id="selectName" onChange={handleNameChange} onBlur={handleNameBlur} value={name} placeholder="Business name" autoComplete="off" />
            <CSSTransition in={nameErr.status} timeout={330} classNames={inputError} unmountOnExit>
              <div className={styles.inputError}>{nameErr.message}</div>
            </CSSTransition>
            {busSug != null && <SearchReslist data={busSug} name="name" selectSearchVal={selectSearchVal} />}
          </div>
          <div className={styles.searchFormSection}>
            <input className={FP ? styles.searchInput : styles.searchInput2} type="text" name="location" id="selectLocation" onChange={handleLocationChange} onBlur={handleLocationBlur} value={location} placeholder="location: city - neighborhood" autoComplete="off" />
            <CSSTransition in={locationErr.status} timeout={330} classNames={inputError} unmountOnExit>
              <div className={styles.inputError}>{locationErr.message}</div>
            </CSSTransition>
            {locSug != null && <SearchReslist data={locSug} name="location" selectSearchVal={selectSearchVal} />}
          </div>
          <div>
            <button className={FP ? styles.searchInput : styles.searchInput2}>Search</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default withRouter(SearchFilter)
