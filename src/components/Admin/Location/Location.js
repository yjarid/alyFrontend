import React, {useState, Fragment} from 'react'
import {LOCATIONS} from '../../../qraphQl/taxonomyType'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import styles from './Location.module.scss'
import PreviewLocation from './PreviewLocation/PreviewLocation'

export default function Location() {
    const [index , setIndex] = useState(null)
    const [city , setCity] = useState(null)
    const [type , setType] = useState('edit')

    const {data} = useQuery(LOCATIONS  )

  const citiesName = data ? data.locations.filter(loc => loc.cat == 'city').map(city => city.name) : []
 const neighberhood = city ? data.locations.filter(loc => loc.group == city) : []
      
 const setBusIndex = (i) => {
          setIndex(i)
          setType('edit')
    }
const setBusCity = (city) => {
    setCity(city)
    setType('edit')
}


     
  
    return (
        <Fragment>
               <p  onClick={()=>setType('create')}>Add New Location</p>
        <div className={styles.container}>
            {typeof data != "undefined" && (
                <Fragment>
                
                    <div className={styles.busList}>
                        {citiesName
                            .map((city, i) => <p key={i} className={styles.busItem} onClick={()=>setBusCity(city)}>{city}</p>)}
                    </div>

                    <div className={styles.busList}>
                        {neighberhood
                            .map((loc, i) => <p key={i} className={styles.busItem} onClick={()=>setBusIndex(i)}>{loc.name}</p>)}
                    </div>
                    <div>
                      {(index != null || type == 'create')&& <PreviewLocation location={neighberhood[index]} cities={citiesName} type={type}/>}  
                    </div>
                </Fragment>
                )
        }
        </div>

        </Fragment>
     
    )
}
