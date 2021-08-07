import React from 'react'
import { css } from '@emotion/react'

const Loading = () => {
  // TODO: UX showing a message upon longer loads, or if there is no internet then just say there's not.
  return (
    <div css={css({ height: '100vh', display: 'flex', flexDirection: 'column' })}>
      <div css={css`padding: 8`}>
        <h1 css={css`margin: 0`}><span css={css`color: #007BA7`}>C</span>erulean</h1>
      </div>
      <div css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 8;
      border-top: 1px solid #efefef;
      background-color: #dfdfdf;
      height: 100%`}
      >
        <div css={css`
        border: 8px solid #3498db; /* Light grey */
        border-top: 8px solid #007BA7; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        `}
        />
      </div>
    </div>
  )
}

export default Loading
