import React, { useState } from 'react'
import { css } from '@emotion/react'
import Login from './login'
import { largeButtonStyle } from './styles'

const Home = () => {
  const [login, setLogin] = useState(false)
  const handleLogin = () => setLogin(l => !l)

  return (
    <div css={css({ height: '100vh', display: 'flex', flexDirection: 'column' })}>
      <div css={css`padding: 8`}>
        <h1 css={css`margin: 0`}><span css={css`color: #007BA7`}>C</span>erulean</h1>
      </div>
      <div css={css`
      display: flex;
      flex-direction: column;
      padding: 8;
      border-top: 1px solid #efefef;
      background-color: #dfdfdf;
      height: 100%`}
      >
        {login
          ? <Login handleClose={() => setLogin(false)} />
          : (
            <>
              <h3>Cerulean is a todo app focused around keeping it simple and helping you get your work *done*. Inspired by Google Tasks.</h3>
              <div css={css({ flex: 1 })} />
              <button css={largeButtonStyle} onClick={handleLogin}>Login</button>
            </>
            )}
      </div>
    </div>
  )
}

export default Home
