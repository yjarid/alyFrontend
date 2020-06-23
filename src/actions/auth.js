// Token
export const addToken = (token = '' ) => ({
    type: 'ADD_TOKEN',
    token
  });
  
 
  export const removeToken = (neighborhood ='') => ({
    type: 'REMOVE_TOKEN',
  });