import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Loading from './loading'
import Home from './home'

const App = () => {
  const [token, setToken] = useState(window.token)
  const [, setCache] = useState(window.cache)
  const [checkingToken, setCheckingToken] = useState(!!window.token)
  const [networkFailure, setNetworkFailure] = useState(false)
  window.setTokenReact = setToken
  window.setCacheReact = setCache

  useEffect(() => {
    if (checkingToken) {
      fetch(window.reqUrl + '/todos', { headers: { authorization: token } })
        .then(res => {
          if (res.ok) {
            res.json().then(resp => {
              setNetworkFailure(false)
              setCheckingToken(false)
              setCache(resp)
              window.setCacheGo(resp)
            })
          } else if (!res.ok && res.status === 401) {
            setToken('')
            window.setTokenGo('')
            setCheckingToken(false)
            setNetworkFailure(false)
          } else {
            // TODO: Looks like there was an internal server error then.
            // The server errored, would you like to retry/try another time?
          }
        })
        .catch(() => {
          setNetworkFailure(true)
          setCheckingToken(false)
        })
    }
  }, [checkingToken, token])

  return checkingToken || networkFailure
    ? <Loading networkFailure={networkFailure} />
    : token ? <></> : <Home />
}

ReactDOM.render(<App />, document.getElementById('app'))
