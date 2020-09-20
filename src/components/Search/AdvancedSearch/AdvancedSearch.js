import React, { useState, useEffect, useContext } from "react"
import { GET_BUSINESSES } from "../../../qraphQl/businessType"
import { useLazyQuery } from "@apollo/react-hooks"
import AdvanceFilter from "../../UI/AdvanceFilter/AdvanceFilter"
import styles from "./AdvancedSearch.module.scss"
import Spinner from "../../UI/Spinner/Spinner"
import { CSSTransition } from "react-transition-group"
import slideDown from "../../../cssTransition/slideDown.module.scss"
import Page from "../../Page/Page"
import { DispatchContext } from "../../../Context"
import MapResultPage from "../../MapResultPage/MapResultPage"
import TopBar from "../../TopBar/TopBar"
import queryString from "query-string"

export default function AdvancedSearch(props) {
  const { cityParam, categoryParam } = queryString.parse(props.location.search)
  const appDispatch = useContext(DispatchContext)
  const [showFilter, setShowFilter] = useState(false)
  const [zoom, setZoom] = useState(8)
  const [bound, setBound] = useState([])
  const [price, setPrice] = useState(null)
  const [neighborhood, setNeighborhood] = useState(null)
  const [neighName, setNeighName] = useState(null)
  const [city, setCity] = useState(null)
  const [cityName, setCityName] = useState(cityParam)
  const [subCat, setSubCat] = useState([])
  const [cat, setCat] = useState(categoryParam || "restaurant")

  let [getBusiness, { data, loading }] = useLazyQuery(GET_BUSINESSES, {
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
    // fetchPolicy: "network-only"
  })

  const dataFinal = typeof data != "undefined" ? data.businesses : []

  useEffect(() => {
    props.history.push(`/map?cityParam=${cityName}&categoryParam=${cat}`)
    fetchBus()
    setShowFilter(false)
  }, [bound[0], price, neighName, JSON.stringify(subCat), cityName, cat])

  const onFilter = (initNeighborhood, initSubCat, initCity, initCat, initPrice) => {
    setBound([])
    setNeighName(null)
    setCityName(null)
    setSubCat([])
    if (initNeighborhood) {
      let parseNeigh = JSON.parse(initNeighborhood)

      setNeighborhood(parseNeigh)
      setNeighName(parseNeigh.neigh)
      setZoom(13)
    }
    if (initCity) {
      // if neigh is not defined filter with city
      let parseCity = JSON.parse(initCity)
      setCity(parseCity)
      setCityName(parseCity.name)
      setZoom(11)
    }

    if (initSubCat.length > 0) {
      setSubCat(initSubCat)
    }

    if (initCat) {
      setCat(initCat)
    }

    if (initPrice) {
      setPrice(initPrice)
    }
  }

  const fetchBus = () => {
    let variab = { published: true }
    let first = 20

    // PART PRICE
    if (price) {
      variab = { ...variab, price }
    }

    // PART LOCATION
    if (neighName) {
      variab = { ...variab, neighborhood: neighName }
    } else {
      // if neigh is not efine we will filter by city
      if (cityName) {
        variab = { ...variab, city: cityName }
      }
    }

    // PART BOUND
    if (bound.length > 0) {
      variab = { ...variab, bound }
    }

    // PART CATEGORY
    if (subCat.length > 0) {
      variab = { ...variab, subCat }

      if (zoom < 14) {
      }
    }

    if (cat) {
      variab = { ...variab, cat }
    }

    getBusiness({ variables: { ...variab, first } })
  }

  const mapBounds2 = bounds => {
    setBound(bounds)
  }

  return (
    <>
      <TopBar />
      <div>
        <div className={styles.showFilterBtn} onClick={() => setShowFilter(!showFilter)}>
          Advanced Filter
        </div>

        <CSSTransition timeout={400} in={showFilter} classNames={slideDown} unmountOnExit>
          <AdvanceFilter onFilter={onFilter} parentCat={cat ? cat : "restaurant"} />
        </CSSTransition>
      </div>

      <Page title="Advanced Search" withTopBar={false}>
        {loading && <Spinner />}
        <MapResultPage businesses={dataFinal} location={neighborhood || city} mapBounds2={mapBounds2} zoom={zoom} />
      </Page>
    </>
  )
}
