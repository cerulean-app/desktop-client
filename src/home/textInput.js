import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

const inputStyle = css`
border: none;
appearance: none;
background: #f2f2f2;
padding: 12px;
border-radius: 3px;
width: 100%;
font-size: 14px;
`

/* https://medium.com/codex/how-to-style-an-input-field-with-css-only-tips-and-techniques-e6a00e9dcc50
const placeholderStyle = css`
position: absolute;
left: 12px;
bottom: 50%;
top: 22px;
transform: translateY(-50%);
width: calc(100% - 24px);
color: #aaa;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
transition: top 0.3s ease, color 0.3s ease, font-size 0.3s ease;
${inputStyle}:not(:placeholder-shown) + &
${inputStyle}:focus + & {
  top: -10px;
  font-size: 10px;
  color: #222;
}` */

const TextInput = React.forwardRef((props, ref) => {
  return (
    <label css={css({
      fontSize: '14px',
      position: 'relative',
      // borderTop: '20px solid transparent',
      border: '8px solid transparent'
    })}
    >
      <input css={inputStyle} {...props} ref={ref} placeholder={props.label} />
      {/* <span css={placeholderStyle}>{props.label}</span> */}
    </label>
  )
})

TextInput.displayName = 'TextInput'
TextInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  label: PropTypes.string.isRequired
}

export default TextInput
