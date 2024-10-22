import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { setCredential } from '../store/authSilce';
import { useUserprofileMutation } from '../store/userApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useGetMyOrdersQuery } from '../store/orderApiSlice';
import Message from '../components/Message';
import { FaTimesCircle } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';


const ProfileScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName]  = useState("");
    const [currentPassword, setcurPassword]  = useState("");
    const [password, setPassword]  = useState("");

    const dispatch = useDispatch();
    const [updateProfile, {isLoading:loadingProfile}] = useUserprofileMutation();
    const {userInfo} = useSelector(store => store.auth);
    const {data:order, isLoading, error} = useGetMyOrdersQuery();

    useEffect(() => {
        if(userInfo){
          setName(userInfo.name);
          setEmail(userInfo.email);
        }
    },[userInfo.name, userInfo.email])

    const submitHandler = async(e) => {
        e.preventDefault();
        try{
    const res = await updateProfile({_id:userInfo._id, name,email,currentPassword,password}).unwrap();
    dispatch(setCredential(res));
    toast.success("Profile updated!")
            }catch(e){
                console.log('Submit handel ', e);
              toast.error(e.data.error)
            }
    };

    
  return <Row>
    <Col md={4}><h2>User Profile</h2>
    <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter Name'
             value={name} onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='name' placeholder='Enter Email'
             value={email} onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='my-2'>
            <Form.Label>Current Password</Form.Label>
            <Form.Control type='confirmPassword' placeholder='confirm Password'
             value={currentPassword} onChange={(e) => setcurPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-2'>
            <Form.Label>New Password</Form.Label>
            <Form.Control type='name' placeholder='Password'
             value={password} onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>
       { loadingProfile ? <Loader></Loader> : <Button type='submit' className='my-3' variant='primary'>
            Update
        </Button> }
        
    </Form>
    </Col>
    <Col md={8}>
    <h2>My Orders</h2>
    {isLoading ? <Loader/>  : error? <Message variant={"danger"}>{error.error}</Message>: 
    <Table striped bordered hover responsive size='sm' className='my-3'>
       <thead className='text-center'>
        <th>ID</th>
        <th>DATE</th>
        <th>TOTAL</th>
        <th>PAID</th>
        <th>DELIVERED</th>
        <th></th>
       </thead>
       <tbody>
        {
            order.map(item => (
              <tr key={item._id} className='text-center'>
                  <td>{item._id}</td>
                  <td>{item.createdAt.substring(0,10)}</td>
                  <td>₹{item.totalPrice}</td>
                  <td>{item.isPaid ? item.paidAt.substring(0,10) : <FaTimesCircle color='gray'/>}</td>
                  <td>{item.isDelivered? item.deliveredAt.substring(0,10) :<FaTimesCircle color='grey'/>}</td>
                  <td ><LinkContainer to={`/order/${item._id}/`}>
                  <Button variant='light' className='btn  btn-outline-secondary' size='1rem'>Details</Button>
                  </LinkContainer></td>
              </tr>
            ))
        }
       </tbody>
    </Table>
    } 
    </Col>
  </Row>
}

export default ProfileScreen