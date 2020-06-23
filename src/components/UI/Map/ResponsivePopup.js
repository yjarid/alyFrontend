import React, { useEffect } from "react"
import { useLeaflet } from "react-leaflet"
import ReactDOMServer from "react-dom/server"
import R from "leaflet-responsive-popup"
import L from "leaflet"
import "leaflet-responsive-popup/leaflet.responsive.popup.css"
import styles from "./SimpleMap.module.scss"
import { StyledRating } from "../../UI/CustomFields/StyledRating"
import { Link, BrowserRouter } from "react-router-dom"

// I LOT OF PAIN to IONTEGRATE the Leaflet responsive plugin
//  so it is put on hold for now

const PopupDisplay = ({ selectedBus }) => {
  let rating = selectedBus && selectedBus.nbrRev ? selectedBus.totRev / selectedBus.nbrRev : 0
  return (
    <>
      {selectedBus && (
        <div>
          <div className={styles.popUpTitle}>
            <BrowserRouter>
              <Link to={`/business/${selectedBus._id}`}>{selectedBus.name}</Link>
            </BrowserRouter>
          </div>
          <div className={styles.rating}>
            <StyledRating name="customized-color" value={rating} precision={0.5} size="small" readOnly />
            <div>{selectedBus.nbrRev} reviews</div>
          </div>
        </div>
      )}
    </>
  )
}

const markers = []

const ResponsivePopup = ({ data, icon, onClick, selectIcon, onMouseOver, map }) => {
  // const { map } = useLeaflet()

  useEffect(() => {
    markers.forEach(e => map.removeLayer(e))
    data.forEach((bus, i) => {
      markers.push(L.marker([bus.latitude, bus.longitude], { icon: icon(bus._id) }))
      markers[i].on("click", () => onClick(bus))
      markers[i].on("mouseover", e => onMouseOver(e, bus))
      const popup = R.responsivePopup().setContent(ReactDOMServer.renderToString(<PopupDisplay selectedBus={bus} />))

      markers[i].addTo(map).bindPopup(popup)
    })
  }, [icon])

  return null
}

export default ResponsivePopup
