import axios from 'axios'

const makeRequestCreator = () => {
  let source

  return async (query) => {

    // Check if we made a request
    if(source){
      // Cancel the previous request before making a new request
      source.cancel()
    }
  
    // Create a new CancelToken
     source = axios.CancelToken.source()
     
    try{
      
      const res = await axios.get(query, {cancelToken: source.token})
      
      const result = res.data
      return result;
    } catch(error) {
        if(axios.isCancel(error)) {
          // Handle if request was cancelled
          console.log('Request canceled', error.message);
        } else {
          // Handle usual errors
          console.log('Something went wrong: ', error.message)
        }
    }
  }
}

export const preventManyReq = makeRequestCreator()


// scroll to particular element
export const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   