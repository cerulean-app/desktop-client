import React, { useContext, useRef, useState } from 'react'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import TextInput from './textInput'
import TokenContext from '../tokenContext'
import { largeButtonStyle, largeButtonStylePadded } from './styles'

const Login = (props) => {
  const passwordRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const { setToken } = useContext(TokenContext)

  const handleLogin = () => {
    setStatus('fetching')
    fetch(reqUrl + '/login?cookie=false', { method: 'POST', body: JSON.stringify({ username, password }) })
      .then(res => {
        if (res.ok) {
          res.json().then(resp => {
            setToken(resp.token)
            // setStatus(null) - causes async state update noop.
          }).catch(() => setStatus('unknown'))
        } else if (res.status === 401) {
          setStatus('invalid')
        } else setStatus('unknown')
      }).catch(() => setStatus('unknown'))
  }

  return (
    <>
      <TextInput
        value={username}
        onKeyPress={e => e.key === 'Enter' && passwordRef.current && passwordRef.current.focus()}
        onChange={e => setUsername(e.target.value)}
        label='Username'
      />
      <TextInput
        ref={passwordRef}
        value={password}
        type='password'
        onKeyPress={e => e.key === 'Enter' && username && password && handleLogin()}
        onChange={e => setPassword(e.target.value)}
        label='Password'
      />
      {status === 'unknown' && <h5 css={css`color: #ff6666`}>An unknown error occurred.</h5>}
      {status === 'invalid' && <h5 css={css`color: #ff6666`}>Invalid username or password!</h5>}
      <div css={css({ flex: 1 })} />
      <button css={largeButtonStylePadded} disabled={!username || !password} onClick={handleLogin}>
        Login
      </button>
      <button css={largeButtonStyle} disabled={status === 'fetching'} onClick={props.handleClose}>
        Cancel
      </button>
    </>
  )
}

Login.propTypes = {
  handleClose: PropTypes.func.isRequired
}

export default Login
