import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup,ListGroupItem, Image, Form, Button, Card } from "react-bootstrap";
import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeCart } from "../store/cartSlice";


const CartScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(store => store.cart)
    const handelQtyChng = async (item , qty) => {
        dispatch(addToCart({...item, qty}))
    }
    const handelRemove = async (id) =>{
       dispatch(removeCart(id))
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

  return (
    <>
    <Row>
        <Col md="8">
          <h1 className="text-secondary " style={{marginBottom:'20px'}}>Shopping Cart</h1>
          {
          cartItems.length === 0 ? (
            <Message>
                Your Cart is Empty <Link className='btn btn-secondary' to="/">Go Back</Link>
            </Message>
          ): <ListGroup>
             {cartItems.map(item => <ListGroup.Item key={item._id}>
                <Row>
                    <Col md="2">
                    <Link to={`/product/${item._id}`}>
                    <Image src={item.image} alt={item.name} fluid  rounded></Image>
                    </Link>
                    </Col>
                    <Col md="3">
                     <Link to={`/product/${item._id}`} className="text-decoration-none text-secondary fw-medium">{item.name}</Link>
                    </Col>
                    <Col md="2">
                    ₹{item.price}
                    </Col>
                    <Col md="2">
                    <Form.Select value={item.qty} onChange={(e) => handelQtyChng(item, Number(e.target.value))}   style={{maxWidth:"5rem"}}>
                    {[...Array(Math.ceil(item.countInStock > 5 ? 4 : 1)).keys()].map(v =>  <option key={v} value={v+1}>{v+1}</option>)}
                    </Form.Select>
                    </Col>
                    <Col md="2">
                     <Button className="btn btn-outline-secondary px-3" onClick={() => handelRemove(item._id)} variant="light">
                     <FaTrash />
                     </Button>
                    </Col>
                </Row>
             </ListGroup.Item> 
            )}
          </ListGroup>
        }
        </Col>
        <Col md="4">
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2 className="text-secondary mb-3">Subtotal ({cartItems.reduce((acc,item) => acc+item.qty,0)}) items</h2>
                    <strong>₹ {cartItems.reduce((acc,item) => acc+item.qty * item.price,0).toFixed(2)}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button type="button" className="btn-block w-100" onClick={checkOutHandler} disabled={cartItems.length <= 0}>Proceed to Checkout</Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </Col>
    </Row>
    </>
  )
}

export default CartScreen