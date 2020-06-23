// Business Reducer

const businessReducerDefaultState = {};

export default (state = businessReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CITY':
      return {
        ...state,
        city : action.city
      };

    case 'SET_NEGH':
      return {
        ...state,
        neighborhood : action.neighborhood
      };

        case 'SET_CAT':
          return {
            ...state,
            cat: action.cat
          }

          case 'SET_SUBCAT':
      return {
        ...state,
        subCat : action.cat
      }
        
    default:
      return state;
  }
};
