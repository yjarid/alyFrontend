import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GET_BUSINESSES } from "../../../qraphQl/businessType"
import { LOCATION } from "../../../qraphQl/taxonomyType"
import Spinner from "../../UI/Spinner/Spinner"
import Page from "../../Page/Page"
import { useLazyQuery } from "@apollo/react-hooks"
import queryString from "query-string"
import { DispatchContext } from "../../../Context"
import MapResultPage from "../../MapResultPage/MapResultPage"
import { upCaseFirstLetter } from "../../../utils/string"

function TaxBizList(props) {
  const appDispatch = useContext(DispatchContext)
  const [bound, setBound] = useState([])
  const [zoom, setZoom] = useState(12)
  const { type, tax, subTax } = useParams()
  const { city, cat } = queryString.parse(props.location.search)

  const [getBusiness, { loading, data, error }] = useLazyQuery(GET_BUSINESSES)

  const [location, { data: dataL }] = useLazyQuery(LOCATION)

  const dataFinal = typeof data != "undefined" ? data.businesses : []
  const locationObj = typeof dataL != "undefined" ? dataL.location : null

  useEffect(() => {
    if (type === "location") {
      if (subTax) {
        location({ variables: { neigh: subTax } })
        setZoom(14)
      } else {
        location({ variables: { neigh: tax } })
      }
    }
  }, [])

  useEffect(() => {
    let variables = { first: 20, published: true }
    if (type === "location") {
      variables.cat = cat
      if (subTax) {
        variables.neighborhood = subTax
      }
      variables.city = tax
    } else if (type === "category") {
      variables.city = city
      if (subTax) {
        variables.subCat = subTax
      }
      variables.cat = tax
    }
    getBusiness({ variables: { ...variables, bound } })
  }, [bound[0], tax, subTax, city, cat])

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
        Results for {upCaseFirstLetter(cat || subTax || tax)} in {upCaseFirstLetter(city || subTax || tax)}
      </h2>
      <MapResultPage businesses={dataFinal} location={locationObj} mapBounds2={mapBounds2} zoom={zoom} />
    </Page>
  )
}

export default TaxBizList
