import React from 'react'
import { useCreateProductsMutation, useGetProductsQuery } from '../store/productsApiSlice'
import Loader from './Loader';
import Message from './Message';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import { MdDelete } from "react-icons/md";
import { useCreateOrderMutation } from '../store/orderApiSlice';
import { toast } from 'react-toastify';


const ProductListScreen = () => {

    const [createProduct, {isLoading:loadingcreate}] = useCreateProductsMutation()
    const {data: products, isLoading,error,refetch} = useGetProductsQuery();
    console.log(products)

    const handeldeleteProduct = (id) => {
        console.log("delete?  ", id)
    }

    const handelcreate = async () =>{
    if(window.confirm("Are you sure wanted to create new product?")){
        try {
            await createProduct();
            refetch()

        } catch (err) {
            console.log(err)
            toast.error(err.data.error || err.error);
        }
    }

    }
  return (
    <>
    <Row className='align-items-center'>
        <Col><h1>Products</h1></Col>
        <Col className='text-end'><Button onClick={handelcreate} className="btn-sm" variant='secondary'><FaEdit/> Create Product</Button></Col>
    </Row>
    {loadingcreate && <Loader/>}
    {isLoading ? <Loader /> : error ? <Message variant={"danger"}>Error {error.data || error.status}</Message>: 
     <Table striped bordered hover className='table-sm my-3'>
        <thead>
            <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
          {products.map(product => (<tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>₹{product.price}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td className='text-center'><LinkContainer to={`/admin/product/${product._id}/edit`}>
                     <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                     </Button>
           </LinkContainer>
           <Button onClick={handeldeleteProduct(product._id)} variant='secondary' className='btn btn-sm ms-3'>
            <MdDelete/>
            </Button> 
           </td>
          </tr>)
        )}
        </tbody>
     </Table>
    }
    </>
  )
}

export default ProductListScreen