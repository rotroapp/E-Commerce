
import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutProcess = ({step1,step2,step3,step4 }) => {
    const padding = "px-1";
  return (
    <Nav className='justify-content-center mb-3 '>
        <Nav.Item>
            {step1 ? <LinkContainer to="/login">
            <Nav.Link className={padding}>Sign In /</Nav.Link>
            </LinkContainer>: (
            <Nav.Link disabled className={padding}>Sign In /</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step2 ? <LinkContainer to="/shipping">
            <Nav.Link className={padding}>Shipping Address /</Nav.Link>
            </LinkContainer>: (
            <Nav.Link disabled className={padding}>Shipping Address /</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step3 ? <LinkContainer to="/payments">
            <Nav.Link className={padding}>Payment /</Nav.Link>
            </LinkContainer>: (
            <Nav.Link disabled className={padding}>Payment /</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step4 ? <LinkContainer to="/placeorder">
            <Nav.Link className={padding}>Place Order</Nav.Link>
            </LinkContainer>: (
            <Nav.Link disabled className={padding}>Place Order</Nav.Link>
            )}
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutProcess