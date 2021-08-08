import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Loading from './loading'
import Todos from './todos'
import Home from './home'
import CacheContext from './cacheContext'
import TokenContext from './tokenContext'

const App = () => {
  const [token, setTokenReact] = useState(window.token)
  const [cache, setCacheReact] = useState(window.cache)
  const [checkingToken, setCheckingToken] = useState(!!window.token)
  const [networkFailure, setNetworkFailure] = useState(false)
  window.setTokenReact = setTokenReact
  window.setCacheReact = setCacheReact
  const setToken = (token) => {
    if (typeof token === 'function') {
      return setTokenReact(prevValue => {
        const newValue = token(prevValue)
        window.setTokenGo(newValue)
        return newValue
      })
    }
    window.setTokenGo(token)
    return setTokenReact(token)
  }
  const setCache = (cache) => {
    if (typeof cache === 'function') {
      return setCacheReact(prevValue => {
        const newValue = cache(prevValue)
        window.setCacheGo(newValue)
        return newValue
      })
    }
    window.setCacheGo(cache)
    return setCacheReact(cache)
  }

  useEffect(() => { if (token) setCheckingToken(true) }, [token])
  useEffect(() => {
    if (checkingToken) {
      fetch(reqUrl + '/todos', { headers: { authorization: token } })
        .then(res => {
          if (res.ok) {
            res.json().then(resp => {
              setNetworkFailure(false)
              setCheckingToken(false)
              setCache(resp)
            })
          } else if (res.status === 401) {
            setToken('')
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

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <CacheContext.Provider value={{ cache, setCache }}>
        {checkingToken || networkFailure
          ? <Loading networkFailure={networkFailure} />
          : token ? <Todos /> : <Home />}
      </CacheContext.Provider>
    </TokenContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
