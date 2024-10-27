import React from 'react'
import { useGetTopProductsQuery } from '../store/productsApiSlice'
import Loader from './Loader';
import Message from './Message';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ProductCarousel = () => {

    const {data:products, isLoading,error} = useGetTopProductsQuery();

  return isLoading ? "" : error ? <Message variant='danger'>{error}</Message>:(
    <Carousel pause='hover' className='bg-secondary mb-4'>
        {products.map(product => (
           <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
            <Image className='d-block' src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='h-25 ' style={{position:"absolute",right:0,left:0,bottom:0, background:"rgb(0,0,0,0.5)"}}>
                <h2 className='display-6 text-light' >
                    {product.name}
                </h2>
            </Carousel.Caption>
            </Link>
           </Carousel.Item> 
        ))}
    </Carousel>
  )
}

export default ProductCarousel;