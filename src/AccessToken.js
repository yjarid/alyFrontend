import jwtDecode from "jwt-decode"

export let AccessToken = null

export const getAccessToken = () => {
  return AccessToken
}

export const setAccessToken = s => {
  AccessToken = s
}

export const loginRequired = (history, appDispatch) => {
  if (!getAccessToken()) {
    appDispatch({ type: "flashMessage", value: { message: "you need to login to perform this action", type: "error" } })
    if (history) {
      history.push(`/login?redirect=${history.location.pathname}`)
    } else {
      window.scrollTo(0, 0)
      return false
    }
  }

  return true
}

export const loggedInUser = () => {
  const token = getAccessToken()
  if (typeof token != "string" || token == "") {
    return {
      user: null,
      type: null
    }
  }
  const user = jwtDecode(token)
  return user
}
