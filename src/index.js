import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.scss"
import { ApolloProvider } from "@apollo/react-hooks"
import { getAccessToken, setAccessToken } from "./AccessToken"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
// import { HttpLink } from "apollo-link-http"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "apollo-link-error"
import { ApolloLink, Observable } from "apollo-link"
import { TokenRefreshLink } from "apollo-link-token-refresh"
import jwtDecode from "jwt-decode"

const Index = () => {
  const cache = new InMemoryCache({})

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle
        Promise.resolve(operation)
          .then(operation => {
            const accessToken = getAccessToken()
            if (accessToken) {
              operation.setContext({
                headers: {
                  authorization: `bearer ${accessToken}`
                }
              })
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) handle.unsubscribe()
        }
      })
  )

  const client = new ApolloClient({
    link: ApolloLink.from([
      new TokenRefreshLink({
        accessTokenField: "accessToken",
        isTokenValidOrUndefined: () => {
          const token = getAccessToken()

          if (!token) {
            return true
          }

          try {
            const { exp } = jwtDecode(token)
            if (Date.now() >= exp * 1000) {
              return false
            } else {
              return true
            }
          } catch {
            return false
          }
        },
        fetchAccessToken: () => {
          return fetch(`${process.env.REACT_APP_BACKENDURL || "https://alybackend.com"}/refresh`, {
            method: "POST",
            credentials: "include"
          })
        },
        handleFetch: accessToken => {
          setAccessToken(accessToken)
        },
        handleError: err => {
          console.warn("Your refresh token is invalid. Try to relogin")
          console.error(err)
        }
      }),
      onError(({ graphQLErrors, networkError }) => {
        console.log(graphQLErrors)
        console.log(networkError)
      }),

      requestLink,
      new createUploadLink({
        uri: process.env.REACT_APP_BACKENDURL || "https://alybackend.com",
        credentials: "include"
      })
    ]),
    cache
  })

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById("root"))
