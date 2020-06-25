// curently deosnot do any thing try to create instances of axios

import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKENDURL || "https://alybackend.com",
  withCredentials: true
})

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => {
  console.log(failedRequest.config)

  const refTok = localStorage.getItem("refTok")

  return instance.post(`/refresh-token`, { refTok: refTok }).then(res => {
    failedRequest.response.config.data = { acsTok: res.data.acsTok }
    return Promise.resolve()
  })
}

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(instance, refreshAuthLogic)

export default instance
