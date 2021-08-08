import React, { useContext, useState } from 'react'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import TextInput from './textInput'
import TokenContext from '../tokenContext'
import { largeButtonStyle } from './styles'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { token, setToken } = useContext(TokenContext)

  const handleLogin = () => {}

  return (
    <>
      <TextInput value={username} onChange={e => setUsername(e.target.value)} label='Username' />
      <TextInput value={password} onChange={e => setPassword(e.target.value)} label='Password' />
      <div css={css({ flex: 1 })} />
      <button css={css({ marginBottom: 8 }, largeButtonStyle)} onClick={handleLogin}>
        Login
      </button>
      <button css={largeButtonStyle} onClick={props.handleClose}>
        Cancel
      </button>
    </>
  )
}

Login.propTypes = {
  handleClose: PropTypes.func.isRequired
}

export default Login
