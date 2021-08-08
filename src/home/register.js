import React, { useContext, useState } from 'react'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import TextInput from './textInput'
import TokenContext from '../tokenContext'
import { largeButtonStyle, largeButtonStylePadded } from './styles'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const { setToken } = useContext(TokenContext)

  const invalidPassword = password && password.length < 8
  const invalidUsername = username && !/^[a-zA-Z0-9_]{4,}$/.test(username)
  const invalidEmail = email && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)

  const handleRegister = () => {
    setStatus('fetching')
    fetch(reqUrl + '/register?cookie=false', { method: 'POST', body: JSON.stringify({ username, password, email }) })
      .then(res => {
        if (res.ok) {
          res.json().then(resp => {
            setToken(resp.token)
            // setStatus(null) - causes async state update noop.
          }).catch(() => setStatus('An unknown error occurred.'))
        } else if (res.status === 409) {
          res.json()
            .then(resp => setStatus(resp.error))
            .catch(() => setStatus('An unknown error occurred.'))
        } else setStatus('An unknown error occurred.')
      }).catch(() => setStatus('An unknown error occurred.'))
  }

  // TODO: Probably do some more ref-ing and focusing on Enter.
  return (
    <>
      <TextInput value={username} onChange={e => setUsername(e.target.value)} label='Username' />
      <TextInput value={email} type='email' onChange={e => setEmail(e.target.value)} label='E-mail' />
      <TextInput value={password} type='password' onChange={e => setPassword(e.target.value)} label='Password' />
      {invalidUsername
        ? (
          <h5 css={css`color: #ff6666`}>
            Usernames must be at least 4 letters, and only include a-z, A-Z, 0-9 and underscores (_).
          </h5>
          )
        : invalidPassword
          ? <h5 css={css`color: #ff6666`}>Passwords must be at least 8 letters long!</h5>
          : invalidEmail && <h5 css={css`color: #ff6666`}>Invalid email entered!</h5>}
      {status && status !== 'fetching' && <h5 css={css`color: #ff6666`}>{status}</h5>}
      <div css={css({ flex: 1 })} />
      <button css={largeButtonStylePadded} disabled={!username || !password} onClick={handleRegister}>
        Register
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
