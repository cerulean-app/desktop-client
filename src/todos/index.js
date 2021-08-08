import React, { useContext, useEffect } from 'react'
import { css } from '@emotion/react'
import CacheContext from '../cacheContext'
import TokenContext from '../tokenContext'

let loggingOut = false // TODO: Logic around this variable is full of weirdness atm.

const Home = () => {
  // TODO: Manual refresh?
  const { cache, setCache } = useContext(CacheContext)
  const { token, setToken } = useContext(TokenContext)

  const handleLogout = (e) => {
    loggingOut = true
    e.preventDefault()
    e.stopPropagation()
    fetch(reqUrl + '/logout', { method: 'POST', headers: { authorization: token } })
      .then(res => {
        if (res.ok || res.status === 401) {
          setToken('')
        } // TODO: else and catch, display banner
      }).catch(() => {})
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (loggingOut) return clearInterval(timer)
      fetch(reqUrl + '/todos', { headers: { authorization: token } })
        .then(res => {
          if (res.ok) {
            res.json().then(resp => setCache(resp))
          } else if (res.status === 401) {
            setToken('')
          } else {
            // TODO: else and catch, display banner
          }
        })
        .catch(() => {})
    }, 5000)
    return () => clearInterval(timer)
  }, [token, setToken, setCache])

  return (
    <div css={css({ height: '100vh', display: 'flex', flexDirection: 'column' })}>
      <div css={css`padding: 8; display: flex`}>
        <h1 css={css`margin: 0`}><span css={css`color: #007BA7`}>C</span>erulean</h1>
        <div css={css`flex: 1`} />
        <div
          css={css`
          width: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-position: center;
          transition: background 0.8s;
          :hover {
            background: #d9d9d9 radial-gradient(circle, transparent 1%, #d9d9d9 1%) center/15000%;
          }
          :active {
            background-color: #efefef;
            background-size: 100%;
            transition: background 0s;
          }
          `} onClick={handleLogout}
        >
          <svg xmlns='http://www.w3.org/2000/svg' enableBackground='new 0 0 24 24' height='24' viewBox='0 0 24 24' width='24'>
            <path d='M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z' />
          </svg>
        </div>
      </div>
      <div css={css`
      display: flex;
      flex-direction: column;
      padding: 8;
      border-top: 1px solid #efefef;
      background-color: #dfdfdf;
      height: 100%;
      word-wrap: break-word /* Remove this eventually. */`}
      >
        {JSON.stringify(cache)}
      </div>
    </div>
  )
}

export default Home
