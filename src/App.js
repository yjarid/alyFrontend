import React, { useEffect, useState } from "react"
import Spinner from "./components/UI/Spinner/Spinner"
import AppRouter from "./routers/AppRouter"
import instance from "./axios/axios"
import { setAccessToken } from "./AccessToken"

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    instance.post("/refresh", { credentials: "include" }).then(res => {
      setAccessToken(res.data.accessToken)
      setLoading(false)
    })

    return console.log("unmouted")
  }, [])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        // to maintain footer at the botom of the page
        <div className="wraper">
          <AppRouter />
        </div>
      )}
    </>
  )
}

export default App
