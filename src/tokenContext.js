import React from 'react'

const TokenContext = React.createContext({
  token: window.token,
  setToken: () => {}
})

export default TokenContext
