
import React, {  useState } from 'react'
import {  useMutation } from '@apollo/react-hooks'
import {UPDATE_CATEGORY , DELETE_CATEGORY, CREATE_CATEGORY} from '../../../../qraphQl/taxonomyType'
import FlashMessage from '../../../UI/FlashMessage/FlashMessage'
import Spinner from '../../../UI/Spinner/Spinner'
import styles from './PreviewCategory.module.scss'
import CategoryForm from './CategoryForm/CategoryForm'



export default function PreviewCategory({subCat = {}, type, categories}) {
const {_id, name} = subCat

const [flash, setFlash] = useState({message : '' , type: ''})

const [updateCategory, { loading}] = useMutation(  UPDATE_CATEGORY, { 
    onCompleted() { setFlash(() => ({message: `Category updated`, type:'sucess' }))  },
    onError(error) { setFlash(() => ({message: error.message, type:'error'})) }
})

const [createCategory] = useMutation(  CREATE_CATEGORY, { 
  onCompleted() { setFlash(() => ({message: `Category created`, type:'sucess' }))  },
  onError(error) { setFlash(() => ({message: error.message, type:'error'})) }
})

const [deleteCategory, { loading : loadingDel }] = useMutation(  DELETE_CATEGORY, { 
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
                  <CategoryForm onSubmit={updateCategory} {...subCat} id={_id} categories={categories} /> 
              </div>
             )
        } else {
          body = (
            <div className={styles.container}>
              <h3 className={styles.formTitle}>New  </h3>
              <CategoryForm onSubmit={createCategory}  categories={categories} /> 
          </div>
         )
        }

   }

    return body
  }

  const deleteLoc = (_id) => {
      deleteCategory({variables : {_id}})
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
