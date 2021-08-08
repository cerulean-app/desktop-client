import React from 'react'

const CacheContext = React.createContext({
  cache: window.cache,
  setCache: () => {}
})

export default CacheContext
