import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer>
        <Container>
            <Row className='text-center py-3'>
                <Col>
                    ProShop &copy;{year}
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer