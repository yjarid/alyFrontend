
// ADD_EXPENSE
export const setCity = (city='' ) => ({
    type: 'SET_CITY',
    city
  });
  
  // REMOVE_EXPENSE
  export const setNeighborhood = (neighborhood ='') => ({
    type: 'SET_NEGH',
    neighborhood
  });
  
  // EDIT_EXPENSE
  export const setCat = (cat = '') => ({
    type: 'SET_CAT',
    cat
  });

  // EDIT_EXPENSE
  export const setSubCat = (subCat = []) => ({
    type: 'SET_SUBCAT',
    subCat
  });