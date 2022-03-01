import React, { forwardRef, useImperativeHandle, useState } from 'react'
import propTypes from 'prop-types'
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonHide ? 'hide' : 'cancel'}</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable