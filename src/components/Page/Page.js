import React, { useEffect } from "react"
import TopBar from "../TopBar/TopBar"

function Page({ title, children, withTopBar }) {
  useEffect(() => {
    document.title = `${title} | Aly`
    window.scrollTo(0, 0)
  }, [title])

  return (
    <>
      {withTopBar && <TopBar />}
      <div className="container">{children}</div>
    </>
  )
}

export default Page
