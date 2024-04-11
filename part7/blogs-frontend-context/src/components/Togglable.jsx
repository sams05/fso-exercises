import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from '@mui/material/Button'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" size="small" onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant="contained" color="primary" size="small" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
