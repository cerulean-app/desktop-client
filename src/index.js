import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Home from './home'
import Loading from './loading'

const App = () => {
  const [token] = useState(window.token)
  const [checkingToken] = useState(!!window.token)
  useEffect(() => {
    if (checkingToken) {
      // TODO: Call /todos.
      // setCheckingToken(false)
    }
  }, [checkingToken])

  return checkingToken ? <Loading /> : token ? <Home /> : <></>
}

ReactDOM.render(<App />, document.getElementById('app'))
