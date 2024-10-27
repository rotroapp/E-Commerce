import { Button, Form, FormCheck } from 'react-bootstrap'
import CheckoutProcess from '../components/CheckoutProcess'
import FormContainer from '../components/FormContainer'
import { useEffect, useState } from 'react'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPaymentMethod } from '../store/cartSlice'


const PaymentScreen = () => {
   
  const [checked, setChecked]= useState("PayPal");
  const navigate = useNavigate();
  const {shippingAdd} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() =>{
    if(!shippingAdd.address) {
      console.log("Rnterd")
      navigate("/shipping");
    }
  },[shippingAdd, navigate])
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setPaymentMethod(checked));
    
    navigate("/placeorder")
  }
  
  return (
    <FormContainer>
        <CheckoutProcess step1 step2 step3 />
        <h1 className=''>Payment Method</h1>
        <Form className='my-4' onSubmit={submitHandler}>
            <FormCheck>
                <Form.Group controlId="PayPal" className="my-3">
                <FormCheckInput type='radio' value='PayPal' checked={checked === 'PayPal'} onChange={(e) => setChecked(e.target.value)} title='PayPal'></FormCheckInput>
                <FormCheckLabel className='ms-3'>PayPal</FormCheckLabel>
                </Form.Group>
                <Form.Group controlId='Card' className='my-3'>
                <FormCheckInput  type='radio' disabled value='Card' checked={checked === 'Card'} onChange={(e) => setChecked(e.target.value)}></FormCheckInput>
                <FormCheckLabel className='ms-3'>Credit Card or Debit Card</FormCheckLabel>
                </Form.Group>
            </FormCheck>
            <Button variant='primary' type="submit" className='my-3'>Proceed</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen