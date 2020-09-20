import React, { useRef, useState, useEffect, Fragment } from "react"
import { Map, Marker, TileLayer, Popup, FeatureGroup } from "react-leaflet"
import L from "leaflet"
import { StyledRating } from "../../UI/CustomFields/StyledRating"
import { Link } from "react-router-dom"
import styles from "./SimpleMap.module.scss"
import useMapBound from "../../../customHooks/useMapBound"

const iconRed = new L.Icon({
  iconUrl: "/svg/marker.svg",
  iconSize: [25, 25]
})
const iconBlue = new L.Icon({
  iconUrl: "/svg/marker-blue.svg",
  iconSize: [25, 25]
})

export default function SimpleMap({ data, area, initZoom, mapBounds, selectedBusFunc, selectedBusfromParent }) {
  const [zoom, setZoom] = useState(initZoom)
  const [selectedBus, setSelectedBus] = useState(selectedBusfromParent)
  const mapRef = useRef()
  const featureRef = useRef()
  const [boundChange, setBound] = useMapBound(Math.max(zoom, initZoom))

  const idFromParent = selectedBusfromParent ? selectedBusfromParent._id : null
  // data
  const businesses = data ? data : []
  let initialCor = area ? [area.lat, area.lng] : [31.791702, -7.09262]

  useEffect(() => {
    setSelectedBus(selectedBusfromParent)
  }, [idFromParent])

  useEffect(() => {
    mapBounds(boundChange)
  }, [boundChange])

  // get bounds

  function updateMap() {
    const b = mapRef.current.leafletElement.getBounds()
    const zoomm = mapRef.current.leafletElement.getZoom()
    const initBound = [b.getSouthWest().lng, b.getSouthWest().lat, b.getNorthEast().lng, b.getNorthEast().lat]

    setZoom(zoomm)
    setBound(initBound)
  }

  const markerClicked = bus => {
    setSelectedBus(bus)
    selectedBusFunc(bus, true)
  }

  const markerHoover = (e, bus) => {
    e.target.openPopup()
    setSelectedBus(bus)
  }

  const selectIcon = id => {
    if (selectedBus) {
      if (id == selectedBus._id) {
        return iconRed
      }
    }
    return iconBlue
  }

  return (
    <Map onViewportChanged={updateMap} center={initialCor} zoom={zoom} minZoom={11} onViewportChanged={updateMap} ref={mapRef}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

      <FeatureGroup ref={featureRef}>
        {businesses.map(bus => {
          let rating = bus.nbrRev ? bus.totRev / bus.nbrRev : 0

          // we have a single point (crime) to render

          return (
            <Marker position={[bus.location.coordinates[1], bus.location.coordinates[0]]} icon={selectIcon(bus._id)} onClick={() => markerClicked(bus)} onMouseOver={e => markerHoover(e, bus)} key={bus._id}>
              {selectedBus && (
                <Popup position={[selectedBus.location.coordinates[1], selectedBus.location.coordinates[0]]} autoPan={false}>
                  <div>
                    <div className={styles.popUpTitle}>
                      <Link to={`/business/${selectedBus._id}`}>{selectedBus.name}</Link>
                    </div>
                    <div className={styles.rating}>
                      <StyledRating name="customized-color" value={rating} precision={0.5} size="small" readOnly />
                      <div>{bus.nbrRev} reviews</div>
                    </div>
                  </div>
                </Popup>
              )}
            </Marker>
          )
        })}
      </FeatureGroup>
    </Map>
  )
}
