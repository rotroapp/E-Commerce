import { Alert } from 'react-bootstrap'
import React from 'react'

const Message = ({variant, children}) => {
  return (
    <Alert variant={variant} className='fw-medium text-center'>{children}</Alert>
  )
}

Message.defaultProps = {
    variant:"info"
}

export default Message;