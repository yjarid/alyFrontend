import { useEffect, useState } from "react"

const useDefinePage = () => {
  const [page, setPage] = useState(-1)

  useEffect(() => {
    const d = new Date()
    const day = d.getDate()
    if (day < 8) setPage(0)
    else if (day >= 8 && day < 14) setPage(0)
    else if (day >= 14 && day < 19) setPage(0)
    else if (day >= 19 && day < 23) setPage(1)
    else if (day >= 23 && day < 26) setPage(1)
    else if (day >= 26 && day < 28) setPage(1)
    else if (day >= 28 && day < 29) setPage(1)
    else if (day >= 29 && day < 30) setPage(1)
    else if (day >= 30 && day < 31) setPage(1)
    else if (day === 31) setPage(1)
  }, [])

  return page
}

export default useDefinePage
