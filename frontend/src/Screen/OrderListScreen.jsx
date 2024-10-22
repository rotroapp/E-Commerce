import React from 'react'
import { useGetOrdersQuery } from '../store/orderApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button, Table } from 'react-bootstrap';
import { FaEdit, FaTimesCircle } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';


const OrderListScreen = () => { 
 
    const {data: order, isLoading, error} = useGetOrdersQuery();

  return (
   <>
    <h1>Orders</h1>
    {isLoading ? <Loader />  :  error ? 
    <Message variant={"danger"}>{error.data.error}</Message>: (
        <Table striped hover responsive className="table-sm">
         <thead>
            <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
            </tr>
         </thead>
         <tbody>
            {order.map((order) => (
                <tr key={order.id}>
                    <td>{order._id}</td>
                    <td>{order.user &&  order.user.name}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>{order.isPaid ? order.paidAt.substring(0,10) : <FaTimesCircle color='gray' size={17}/>}</td>
                    <td>{order.isDelivered? order.deliveredAt.substring(0,10) :<FaTimesCircle color='grey' size={17}/>}</td>
                    <td><LinkContainer to={`/order/${order._id}/`}>
                    <Button variant='light' className='btn btn-sm btn-outline-secondary '>Details</Button>
                    </LinkContainer></td>
                </tr>
            ))}
         </tbody>
        </Table>
    )}
   </>
  )
}

export default OrderListScreen