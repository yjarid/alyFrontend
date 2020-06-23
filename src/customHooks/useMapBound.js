import { useState } from "react"

const useMapBound = zoom => {
  const [bounds, setBound] = useState([])
  const [boundChange, setPrevBound] = useState([])
  const [prevZoom, setPrevZoom] = useState(8)

  if (bounds.length >= 0) {
    // calculation to prevent sending a request with evry move to the map or a zoom

    let newMiddlePointLat = (bounds[1] + bounds[3]) / 2
    let newMiddlePointLng = (bounds[0] + bounds[2]) / 2
    let oldMiddlePointLat = (boundChange[1] + boundChange[3]) / 2
    let oldMiddlePointLng = (boundChange[0] + boundChange[2]) / 2

    let difference = Math.abs(newMiddlePointLat - oldMiddlePointLat) + Math.abs(newMiddlePointLng - oldMiddlePointLng)

    if (prevZoom != zoom) {
      setPrevZoom(zoom)
      setPrevBound(bounds)
    } else if ((difference >= 0.04 && zoom >= 11) || (difference >= 0.03 && zoom == 13) || (difference >= 0.02 && zoom == 14) || (difference >= 0.01 && zoom >= 15) || (difference >= 0.006 && zoom >= 17)) {
      setPrevZoom(zoom)
      setPrevBound(bounds)
    }
  }

  return [boundChange, setBound]
}

export default useMapBound
