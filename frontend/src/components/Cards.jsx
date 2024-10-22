import { Card } from "react-bootstrap";
import React from 'react'
import { Link } from "react-router-dom";
import Rating from "./Rating";
import styles from './Cards.module.css'

const ProductCards = ({product}) => {
  return (
    <Card className="text-secondary my-2 p-2 rounded">
     <Link to={`/product/${product._id}`}>
     <Card.Img variant="top" src={product.image} />
     </Link>
     <Card.Body>
     <Link to={`/product/${product._id}`} className="text-decoration-none text-center text-black-50" >
     <Card.Title className={styles.prdtitle} as="h5">
        <strong>
            {product.name}
        </strong>
    </Card.Title>     
     </Link>
     <Rating value={product.rating} text={product.numReviews}></Rating>
     <Card.Text as='h5' className="text-decoration-none text-center">
     ₹{product.price}
     </Card.Text>
     </Card.Body>
    </Card>
  )
}

export default ProductCards;
