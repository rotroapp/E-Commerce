import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { shippingAddress } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutProcess from "../components/CheckoutProcess";


const ShippingScreen = () => {
    const navigate = useNavigate()
    const {shippingAdd} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [address, setaddress] = useState(shippingAdd?.address? shippingAdd.address: "");
    const [city, setCity] = useState(shippingAdd?.city? shippingAdd.city: "");
    const [postalCode, setPostalCode] = useState(shippingAdd?.postalCode? shippingAdd.postalCode: "");
    const [country, setcountry] = useState(shippingAdd?.country? shippingAdd.country: "");
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(shippingAddress({address,city,postalCode,country}));
        navigate('/payments')
    }

  return (<>
 <CheckoutProcess step1 step2 />
    <FormContainer>
        <h1 className="display-6">Shipping Address</h1>
        <Form className="submit" onSubmit={submitHandler}>
          <Form.Group controlId="address" className="my-3">
             <Form.Label>Address</Form.Label>
               <Form.Control type="text" placeholder="Enter Address"
               onChange={(e) => setaddress(e.target.value)}
               value={address}>
               </Form.Control>
          </Form.Group>
          <Form.Group controlId="city" className="mb-3">
             <Form.Label>City</Form.Label>
               <Form.Control type="text" placeholder="Enter City"
               onChange={(e) => setCity(e.target.value)}
               value={city}>
               </Form.Control>
          </Form.Group>
          <Form.Group controlId="postalcode" className="mb-3">
             <Form.Label>Postal Code</Form.Label>
               <Form.Control type="text" placeholder="Enter PostalCode"
               onChange={(e) => setPostalCode(e.target.value)}
               value={postalCode}>
               </Form.Control>
          </Form.Group>
          <Form.Group controlId="country" className="mb-3">
             <Form.Label>Country</Form.Label>
               <Form.Control type="text" placeholder="Enter Country"
               onChange={(e) => setcountry(e.target.value)}
               value={country}>
               </Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" >Continue</Button>
        </Form>

    </FormContainer>
    </>
  )
}

export default ShippingScreen