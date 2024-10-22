// import products from '../products';
import React, { useEffect, useState } from 'react'
import { Row,Col,Image, ListGroup, Card } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating';
import axios from 'axios';
import { useGetProductDetailQuery } from '../store/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Form } from 'react-bootstrap';
import {addToCart} from "../store/cartSlice.js"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const Products = () => {

    const navigate = useNavigate()
    const [qty, setqty] = useState(1);
    const {id:productId} = useParams();

    const {data:product, error, isLoading} = useGetProductDetailQuery(productId);
    
    const dispatch = useDispatch();
    const addCartHandel = () => {
        console.log(">>stage");
        toast.success("Item Added");
        dispatch(addToCart({...product,qty}));
        navigate("/cart");
    }


    // useEffect(() => {
    
    // const controller = new AbortController();
    // const signal = controller.signal;

    //     ;(async () => {
    //         const res = await axios.get(`/api/products/`+ productId,{signal});
    //         const {data} = await res;
    //         setProducts(data)
    //     })()

    //     return () =>{
    //          controller.abort();
    //          console.log("Aborted the controller")
    //     }
    // },[productId])
    
    // const product = products.find((p) => p._id === productId);
    // console.log(productId)

  return (
    <>{error ? ( <Message variant={"danger"}>Error: {error.status}</Message>) : isLoading ? (<Loader/>) :
    (<>
    <Link className='btn btn btn-outline-secondary 'to='/'>Go Back</Link>
    <Row className='my-5'>
        <Col md={5}>
        <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4} >
        <ListGroup variant='flush'>
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
            <ListGroup.Item><Rating value={product.rating} text={product.numReviews}/></ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
            <ListGroup.Item><div className='fw-bold fs-5 text-center border-bottom pb-3'>Price: ₹{product.price}</div></ListGroup.Item>
        </ListGroup>

        </Col>
        <Col md={3}>
        <Card>
        <ListGroup>
            <ListGroup.Item>
                <Row>
                    <Col><h6>Price:</h6></Col>
                    <Col ><h6>₹{product.price}</h6></Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                <Col><h6>Status:</h6></Col>
                    <Col><h5>{product.countInStock > 0 ? 'InStock' : 'OutOfStock'}</h5></Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col><h6>Qty:</h6></Col>
                    <Col>
                    <Form.Select value={qty} onChange={(e) => setqty(Number(e.target.value))} size="sm"  style={{maxWidth:"55px"}}>
                    {[...Array(Math.ceil(product.countInStock > 5 ? 4 : 1)).keys()].map(v =>  <option key={v} value={v+1}>{v+1}</option>)}
                    </Form.Select>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col ><button disabled={product.countInStock <= 0} 
                    type="button" 
                    onClick={addCartHandel}
                    className='btn btn-warning fw-medium'>Add to Cart</button>
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
        </Card>
        </Col>
    </Row>

    </>)}</>
  )
}

export default Products