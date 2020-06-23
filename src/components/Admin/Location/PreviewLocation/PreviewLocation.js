
import React, {  useState } from 'react'
import {  useMutation } from '@apollo/react-hooks'
import {UPDATE_LOCATION , DELETE_LOCATION, CREATE_LOCATION} from '../../../../qraphQl/taxonomyType'
import FlashMessage from '../../../UI/FlashMessage/FlashMessage'
import Spinner from '../../../UI/Spinner/Spinner'
import styles from './PreviewLocation.module.scss'
import LocationForm from './LocationForm/LocationForm'


export default function PreviewLocation({location = {}, type, cities}) {
const {_id, name} = location

const [flash, setFlash] = useState({message : '' , type: ''})

const [updateLocation, { loading}] = useMutation(  UPDATE_LOCATION, { 
    onCompleted() { setFlash(() => ({message: `Location updated`, type:'sucess' }))  },
    onError(error) { setFlash(() => ({message: error.message, type:'error'})) }
})

const [createLocation] = useMutation(  CREATE_LOCATION, { 
  onCompleted() { setFlash(() => ({message: `Location updated`, type:'sucess' }))  },
  onError(error) { setFlash(() => ({message: error.message, type:'error'})) }
})

const [deleteLocation, { loading : loadingDel }] = useMutation(  DELETE_LOCATION, { 
    onCompleted() { setFlash(() => ({message: `Location deleted`, type:'sucess' }))  },
    onError(error) { setFlash(() => ({message: error.message, type:'error'})) }
})


  const display = () => {
    let body = null
    if(loading || loadingDel){ body = <Spinner /> }
    else { 
        if(type=='edit') {
            body = (
                <div className={styles.container}>
                  <h3 className={styles.formTitle}>Edit </h3>
                  <LocationForm onSubmit={updateLocation} {...location} id={_id} cities={cities} /> 
              </div>
             )
        } else {
          body = (
            <div className={styles.container}>
              <h3 className={styles.formTitle}>New  </h3>
              <LocationForm onSubmit={createLocation}  cities={cities} /> 
          </div>
         )
        }

   }

    return body
  }

  const deleteLoc = (_id) => {
      deleteLocation({variables : {_id}})
  }

    return (
      <div>
        {flash ? <FlashMessage  message={flash.message} type={flash.type}/> : null}
       
          {display()}
          <button onClick={deleteLoc}> delete</button>
          <button> <span className={styles.edit}>Edit</span></button>
          
          
      </div>
        
      
    )
}
