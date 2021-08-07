import React from 'react'
import { css } from '@emotion/react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    <>
      <div css={css`padding: 8;`}>
        {XMLHttpRequest.toString()}
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
