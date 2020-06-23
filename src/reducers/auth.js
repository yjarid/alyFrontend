// Auth Reducer


export default (state = '', action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return state = action.token

    case 'REMOVE_TOKEN':
      return state = '';     
        
    default:
      return state;
  }
};
