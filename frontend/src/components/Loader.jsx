import { Spinner } from 'react-bootstrap'
import React from 'react'

const Loader = () => {
  return (
    <Spinner animation='border' role='status' 
    style={{height:"100px",
            width:"100px",
            margin:'auto',
            display:'block'
    }}/>
  )
}

export default Loader;