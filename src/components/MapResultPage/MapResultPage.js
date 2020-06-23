import React, { useState } from "react"
import MapResult from "./MapResult/MapResult"
import styles from "./MapResultPage.module.scss"
import SimpleMap from "../UI/Map/SimpleMap"

function MapResultPage({ businesses, location, mapBounds2, zoom }) {
  const [selectedBus, setSelectedBus] = useState(null)
  const [scroll, setScroll] = useState(false)
  const [showMapMob, setShowMapMob] = useState(null)

  const selectedBusFunc = (bus, scroll) => {
    setSelectedBus(bus)
    setScroll(scroll)
  }

  const mapBounds = bound => mapBounds2(bound)

  return (
    <>
      <div className={styles.listMap}>
        <button>
          <span className={styles.listMapBtn} onClick={() => setShowMapMob("list")}>
            List
          </span>
        </button>
        <button>
          <span className={styles.listMapBtn} onClick={() => setShowMapMob("map")}>
            Map
          </span>
        </button>
      </div>
      <div className={styles.searchResContainer}>
        {(!showMapMob || showMapMob == "list") && <MapResult data={businesses} selectedBus={selectedBus} selectedBusFunc={selectedBusFunc} scroll={scroll} />}
        <div className={styles.fixContainer}>
          <div className={styles.mapContainer}>{(!showMapMob || showMapMob == "map") && <SimpleMap data={businesses} area={location ? { lat: location.lat, lng: location.lng } : { lat: "33.573109", lng: "-7.617050" }} mapBounds={mapBounds} initZoom={zoom} selectedBusFunc={selectedBusFunc} selectedBusfromParent={selectedBus} />}</div>
        </div>
      </div>
    </>
  )
}

export default MapResultPage
