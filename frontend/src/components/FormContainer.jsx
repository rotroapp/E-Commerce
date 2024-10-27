import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({children}) => {
  return (
    <Container>
        <Row className='justify-content-md-center'>
         <Col className="shadow border border-1 p-5"  xs={12} md={6} >
         {children}
         </Col>
        </Row>
    </Container>
  )
}

export default FormContainer