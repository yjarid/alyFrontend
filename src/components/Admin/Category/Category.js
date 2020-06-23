import React, {useState, Fragment} from 'react'
import {CATEGORIES} from '../../../qraphQl/taxonomyType'
import { useQuery } from '@apollo/react-hooks'
import styles from './Category.module.scss'
import PreviewCategory from './PreviewCategory/PreviewCategory'

export default function Category() {
    const [index , setIndex] = useState(null)
    const [cat , setCat] = useState(null)
    const [type , setType] = useState('edit')

    const {data} = useQuery(CATEGORIES  )

   

  const catName = data ? data.categories.filter(item => item.cat == 'buz01').map(cat => cat.name) : []
 const subCatName = cat ? data.categories.filter(item => item.group == cat) : []

 const setBusIndex = (i) => {
          setIndex(i)
          setType('edit')
    }
const setBusCity = (cat) => {
    setCat(cat)
    setType('edit')
}


     
  
    return (
        <Fragment>
               <p  onClick={()=>setType('create')}>Add New Category</p>
        <div className={styles.container}>
            {typeof data != "undefined" && (
                <Fragment>
                
                    <div className={styles.catList}>
                        {catName
                            .map((cat, i) => <p key={i} className={styles.catItem} onClick={()=>setBusCity(cat)}>{cat}</p>)}
                    </div>

                    <div className={styles.subCatList}>
                        {subCatName
                            .map((subCat, i) => <p key={i} className={styles.subCatItem} onClick={()=>setBusIndex(i)}>{subCat.name}</p>)}
                    </div>
                    <div>
                      {(index != null || type == 'create')&& <PreviewCategory subCat={subCatName[index]} categories={catName} type={type}/>}  
                    </div>
                </Fragment>
                )
        }
        </div>

        </Fragment>
     
    )
}
