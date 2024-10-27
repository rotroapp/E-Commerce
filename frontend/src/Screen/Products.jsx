// import products from '../products';
import React, { useEffect, useState } from 'react'
import { Row,Col,Image, ListGroup, Card, CardBody, CardHeader, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating';
import axios from 'axios';
import { useCreateReviewMutation, useGetProductDetailQuery } from '../store/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Form } from 'react-bootstrap';
import {addToCart} from "../store/cartSlice.js"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Meta from '../components/Meta.jsx';


const Products = () => {

    const navigate = useNavigate()
    const [qty, setqty] = useState(1);
    const [rating, setrating] = useState("");
    const [comment, setcomment] = useState("");
    const {id:productId} = useParams();
    const [createreview, {isLoading:reviewLoading}] = useCreateReviewMutation()
    const {data:product, error,isLoading, refetch} = useGetProductDetailQuery(productId);
    const {userInfo} = useSelector(store => store.auth)
   
    const dispatch = useDispatch();
    const addCartHandel = () => {
        console.log(">>stage");
        toast.success("Item Added");
        dispatch(addToCart({...product,qty}));
        navigate("/cart");
    }

    const submithandler = async (e) => {
        e.preventDefault();
        try {
            const res = await createreview({
                productId,
                rating,
                comment
                }).unwrap();
                console.log("reszz ", res)
            toast.success(res)
            refetch();
            setcomment("");
            setrating(0)
        } catch (err) {
            console.log(err)
            toast.error(err.data.error)
        }
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
    <Meta title={product.name}/>
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
        <Row>
        <Col md={6}>
        <h2>Reviews</h2>
        {product.reviews.length == 0 && <Message variant={"secondary"}>No Reviews</Message>}
        <ListGroup variant='flush' >
         {product.reviews.map(review => (<ListGroup.Item>
            <Card className='text-center p-0 ' >
            <CardHeader ><strong>{review.name}</strong>
            <Rating value={review.rating} />
            </CardHeader>
          
            <CardBody>
                <p>" {review.comment} "</p>
                <p className='text-end'><em>~ {review.createdAt.substring(0,10)}</em></p>
            </CardBody>
            </Card>
         </ListGroup.Item>))}
         <ListGroup.Item  className='mt-4 border rounded-3 p-4 bg-light'>
            <h2>Write a Customer Review</h2>
            {reviewLoading && <Loader/>}
            { userInfo? <Form onSubmit={submithandler}>
                <Form.Group className='my-3'>
                <Form.Label>Feedback</Form.Label>
                <Form.Control type='text' value={comment} rows='3' onChange={(e) => setcomment(e.target.value)} as="textarea" size='lg'></Form.Control>
                </Form.Group >
                <Form.Group className='my-3'>
                <Form.Label>Rating</Form.Label>
                <Form.Control value={rating} onChange={(e) => setrating(e.target.value)} as="select" type='rating'>
                    <option value="0">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                </Form.Control>
                </Form.Group>
                <Button disabled={reviewLoading} type='submit' variant='primary'>Submit</Button>
            </Form> : (
                <Message >
                    Please <Link to="/login">sign in </Link> to write a review {" "}
                </Message>
            )}
            
         </ListGroup.Item>
        </ListGroup>
        </Col>
        {/* <Col md={6}>
        <ListGroup variant='flush'>
       
        </ListGroup>
        </Col> */}
        </Row>
    </>)}</>
  )
}

export default Products