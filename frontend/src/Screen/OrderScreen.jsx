import { Link, useParams } from "react-router-dom";
import {Button, Card, Col, Image, ListGroup, Row, Spinner} from 'react-bootstrap';
import React, { useEffect } from 'react'
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation, useUpdateDeliverMutation } from "../store/orderApiSlice";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loader from "../components/Loader";
import { toast } from "react-toastify";


const OrderScreen = () => {
    const {id: orderId} = useParams();
    const [{ isPending }, PayPaldispatch] = usePayPalScriptReducer();
    const {data:order,refetch, isLoading, error} = useGetOrderDetailsQuery(orderId);
    console.log("orderzz ", order)
    const [payOrder, {isLoading: loadingpay}] = usePayOrderMutation();
    const [updateDeliver, {isLoading: deliverloading}]= useUpdateDeliverMutation();
    const {data:paypal, isLoading: loadingPaypal, error: errorPaypal} = useGetPayPalClientIdQuery(); 
    const {userInfo} = useSelector((state) => state.auth);
    
    
    const handelDeliver = async () => {
        try{
          await updateDeliver(orderId).unwrap();
          refetch();
          toast.success("Order Delivered")
          
        }catch(e)
        {
            console.log(e)
            toast.error(e.message)
        }
    }

    useEffect(() =>{
        if(!errorPaypal && !loadingPaypal && paypal.clientId){
            const loadPayPalScript = async() => {
                PayPaldispatch({
                    type: 'resetOptions',
                    value:{
                        'client-id': paypal.clientId,
                        currency: 'USD'
                    }
                });
        PayPaldispatch({type: 'setLoadingStatus', value: 'pending'})
            }         
            if(order && !order.isPaid)
                {
                    if(!window.paypal){
                        loadPayPalScript()
                    }
                }
            }
         },[order, paypal, PayPaldispatch, loadingPaypal, errorPaypal])


    function onApprove(data, actions){
      return actions.order.capture().then(async function(details){
        try {
            await payOrder({orderId, details});
            refetch();
            toast.success('Payment sucessful');
        } catch(err)
        {
            console.log("errz ", err)
            toast.error(err?.data?.message || err.message); 
        }
      });
    }

    async function onApproveTest(){
        await payOrder({orderId, details: {payer:{}}});
        refetch();
        toast.success('Payment successful');
    };

    function onError(err){
        console.log("errz ", err)
        toast.error(err.message)
    };

    function createOrder(data, actions){
        return actions.order.create({
            purchase_units:[{
                     amount: {
                        value: order.totalPrice,
                     },
            },],
        }).then((orderId) => {
            return orderId;
        });
    };



   
  return (
    <>
    <Row className="row justify-content-md-center">
       {isLoading? <Spinner/> : error ?(<Message variant={"danger"}>{error.error}</Message>): <><h1>Order Id: ({orderId})</h1>
        <Col md={8}>
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                    <strong>Name: </strong>{order.user.name}
                </p>
                <p>
                    <strong>Email: </strong>{order.user.email}
                </p>
                <p>
                    <strong>Address: </strong>{order.shippingAddress.address},{" "}{order.shippingAddress.city},
                    {" "}{order.shippingAddress.postalCode},{" "}{order.shippingAddress.country}
                </p>
                {
                    order.isDelivered? (
                        <Message variant={"success"}>Delivered on {order.deliveredAt}</Message>
                    ): (
                        <Message variant={"secondary"}>To Be Delivered</Message>
                    )
                }
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p><strong>Method: </strong>{order.paymentMethod}</p>
                {
                    order.isPaid? <Message variant={"success"}>Paid for Order on {order.paidAt}</Message> :
                    <Message variant={"danger"}>Not Paid</Message> 
                }
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Order Items</h2>
{order.orderItems.map( (item ,index) =>
                <ListGroup.Item>
                   <Row>
                    <Col md={1}>{index +1}</Col>
                   <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col>
                    <Link to={`product/${item.product}`}>
                    {item.name}
                    </Link>
                    </Col>
                    <Col >
                    {item.price*item.qty}
                    </Col>
                </Row>
                </ListGroup.Item>
                   )}
            </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                    <Col>Items</Col>
                    <Col>₹{order.itemsPrice}</Col>
                    </Row>
                    <Row>
                    <Col>Shipping</Col>
                    <Col>₹{order.shippingPrice}</Col>
                    </Row>
                    <Row>
                    <Col>Tax<em className="text-secondary fw-lighter">(gst@18%)</em> </Col>
                    <Col>₹{order.taxPrice}</Col>
                    </Row>
                    <Row>
                        <Col><strong>Total </strong></Col>
                        <Col><strong>₹{order.totalPrice}</strong></Col>
                    </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                    <ListGroup.Item>
                        {loadingpay && <Loader/>}
                        {isPending? <Loader /> : (
                            <div>
                                {/* <Button onClick={onApproveTest} style={{marginBottom:"10px"}}>Test Order Pay</Button> */}
                                 <div>
                                 <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                                 </div>
                            </div>                
                        )}
                    </ListGroup.Item>
                )}
                {deliverloading && <Loader/>}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&
                <ListGroup.Item>
                  <Button type="button" variant="primary"  className="my-2" onClick={handelDeliver}>Mark as Delivered</Button>
                </ListGroup.Item>
                }
            </ListGroup>
        </Card>
        </Col></>}
        
    </Row>
    </>
  )
}

export default OrderScreen