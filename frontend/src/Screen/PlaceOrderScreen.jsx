import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProcess from "../components/CheckoutProcess";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import { useCreateOrderMutation } from "../store/orderApiSlice";
import Loader from "../components/Loader";
import { clearCartItems } from "../store/cartSlice";
import { toast } from "react-toastify";



const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const {shippingAdd,paymentMethod, cartItems,itemsPrice, totalPrice,shippinPrice,taxPrice } = useSelector(store => store.cart);
    const [createOrder, {isLoading,error}] = useCreateOrderMutation();
    const dispatch = useDispatch();

    const placeOrderhandel = async () => {
try {
     const res = await createOrder({
                  shippingAdd,
                  paymentMethod, 
                  cartItems,
                  itemsPrice, 
                  totalPrice,
                  shippinPrice,
                  taxPrice}).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`)
} catch (error) {
    toast.error(error)
}
    }

    useEffect(() => {
        if(!shippingAdd)
        {
            navigate('/shipping')
        }
        else if(!paymentMethod)
        {
            navigate('/payments')
        }
    },[shippingAdd, paymentMethod, navigate])



    return <>
    <CheckoutProcess step1 step2 step3 step4 />
    <Row>
        <Col md={8}>
         <ListGroup variant="flush">
            <ListGroup.Item>
                <h2  className="display-6">Shipping</h2>
                <p className="my-3">
                    <strong>Address: </strong>
                    {shippingAdd.address},{shippingAdd.city} ,
                    {shippingAdd.postalCode},{shippingAdd.country}
                </p>
         </ListGroup.Item>
         <ListGroup.Item>
            <h5 className="display-6">Payment Method</h5>
            <p className="my-3"><strong>Method: </strong> {paymentMethod}</p>
         </ListGroup.Item>
         <ListGroup.Item>
         <h5 className="display-6">Order Items</h5>
         <div className="my-3">{
            cartItems.length==0 ? (<Message>Your cart is empty</Message>):
                cartItems.map(item => (
                    <ListGroup.Item key={item._id}>
                        <Row>
                            <Col md={1}>
                            <Image src={item.image} alt="no_Img" fluid />
                            </Col>
                            <Col>
                            <Link to={`/product/${item._id}`}>
                            <span>{item.name}</span>
                            </Link>
                            </Col>
                            <Col md={2}>
                              <span >{item.qty}x </span>
                            </Col>
                            <Col md={4}>
                              <span >₹{item.qty*item.price}</span>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}</div>
         </ListGroup.Item>
         </ListGroup>
        </Col>
        <Col md={4}>
         <Card>
            <ListGroup >
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items: </Col>
                        <Col>₹{itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping: </Col>
                        <Col>₹{shippinPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax<em className="text-secondary fw-lighter">(gst@18%)</em>: </Col>
                        <Col>₹{taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col><strong>Total: </strong></Col>
                        <Col><strong>₹{totalPrice}</strong></Col>
                    </Row>
                </ListGroup.Item>
              {  error && 
              <ListGroup.Item>
                      <Row>
                        <Col>{error.error}</Col>
                      </Row>
                </ListGroup.Item> }
                <ListGroup.Item>
                    <Button type="button" className="btn-block" 
                    disabled={cartItems.length ==0} onClick={placeOrderhandel}>Place Order</Button>
                    {isLoading && <Loader />}
                </ListGroup.Item>
            </ListGroup>
         </Card>
        </Col>
    </Row>
    </>
}

export default PlaceOrderScreen;