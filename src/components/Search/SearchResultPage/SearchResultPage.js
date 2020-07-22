import React, { useState, useContext, useEffect } from "react"
import { GET_BUSINESSES } from "../../../qraphQl/businessType"
import { LOCATION } from "../../../qraphQl/taxonomyType"
import Spinner from "../../UI/Spinner/Spinner"
import Page from "../../Page/Page"
import queryString from "query-string"
import { useLazyQuery, useQuery } from "@apollo/react-hooks"
import { DispatchContext } from "../../../Context"
import MapResultPage from "../../MapResultPage/MapResultPage"
import { upCaseFirstLetter } from "../../../utils/string"

function SearchResultPage(props) {
  const appDispatch = useContext(DispatchContext)
  const [bound, setBound] = useState([])
  const { location, name, locCat } = queryString.parse(props.location.search)

  const [getBusiness, { data, loading, error }] = useLazyQuery(GET_BUSINESSES)
  const { data: dataL } = useQuery(LOCATION, { variables: { neigh: location } })

  const dataFinal = typeof data != "undefined" ? data.businesses : []
  const locationObj = typeof dataL != "undefined" ? dataL.location : null

  useEffect(() => {
    let variables = { query: name, bound, limit: 20, published: true }
    if (locCat == "city") {
      variables.city = location
    } else {
      variables.neighborhood = location
    }
    getBusiness({ variables })
  }, [bound[0], name, location])

  useEffect(() => {
    if (error) {
      appDispatch({ type: "flashMessage", value: { message: "Something went wrong", type: "error" } })
    }
  }, [error])

  const mapBounds2 = bounds => {
    setBound(bounds)
  }

  return (
    <Page title="Search Results" withTopBar={true}>
      {loading && <Spinner />}
      <h2 className="searchTitle">
        Results for {upCaseFirstLetter(name)} in {upCaseFirstLetter(location)}
      </h2>
      <MapResultPage businesses={dataFinal} location={locationObj} mapBounds2={mapBounds2} zoom={12} />
    </Page>
  )
}

export default SearchResultPage
