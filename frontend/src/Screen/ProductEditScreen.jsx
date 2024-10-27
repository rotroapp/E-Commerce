import React, { useEffect, useRef, useState } from 'react'
import { useGetProductDetailQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../store/productsApiSlice'
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProductEditScreen = () => {
    const {id:productId} = useParams();
    const [updateproduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();
    const {data:products, isLoading: productload, refetch, error} = useGetProductDetailQuery(productId);
    const [uploadImg, {isLoading: imgLoading}] = useUploadProductImageMutation();
    const navigate = useNavigate();

           const [name, setName] = useState('');
           const [image, setImage] = useState('');
           const [brand, setBrand] = useState('');
           const [category, setCategory] = useState('');
           const [description, setDesc] = useState('');
           const [countInStock, setcountInStock] = useState('');
           const [price, setPrice] = useState(0);


    useEffect(() => {
        if(products)
        {
          setName(products.name);
          setImage(products.image);
          setBrand(products.brand);
          setCategory(products.category);
          setDesc(products.description)
          setcountInStock(products.countInStock);
          setPrice(products.price)

        }
        console.log("effect called")
    },[products])

    const onSubmithandler = async (e) => {
          e.preventDefault();
        const updateProduct = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        };
         try{
            await updateproduct(updateProduct).unwrap(); 
            toast.success("Product update");
            navigate('/admin/productlist/1');
         }catch(err){
            console.log(err)
            toast.error(err?.data?.error || err?.error);
         }
    }

    const uploadFileHandler = async(e) => { 
      const formData = new FormData();
      formData.append('image',e.target.files[0]);
      try{
        const res= await uploadImg(formData).unwrap();
        toast.success(res.msg);
        setImage(res.image)
      }catch(e){
        toast.error(e.message)
      }
    }

  return (
    <>
    <Link to='/admin/productlist/1' className='btn btn-outline-dark my-3 border'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {productload ?<Loader /> : error? <Message variant='danger'>Error {error.status}</Message>:(
            <Form onSubmit={onSubmithandler}>
                <Form.Group className='my-4'controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='my-4'controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                  type='number'
                  placeholder='Enter Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}>
                  </Form.Control>
                </Form.Group>

               <Form.Group controlId='image' className='my-2'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='text' placeholder='Enter Image url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                <Form.Control type='file' title='choose file' onChange={uploadFileHandler}></Form.Control>
               </Form.Group>
                <Form.Group className='my-4'controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                  type='text'
                  placeholder='Enter Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}>
                  </Form.Control>
                </Form.Group>

                <Form.Group className='my-4'controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                  type='text'
                  placeholder='Enter Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  </Form.Control>
                </Form.Group>

                <Form.Group className='my-4'controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                  type='text'
                  placeholder='Enter Description'
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}>
                  </Form.Control>
                </Form.Group>

                <Form.Group className='my-4'controlId='countInStock'>
                  <Form.Label>Count In Stock ?</Form.Label>
                  <Form.Control
                  type='number'
                  placeholder='Enter countInStock'
                  value={countInStock}
                  onChange={(e) => setcountInStock(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Button type="submit" variant='primary'>Save Changes</Button>
            </Form>
        )}
    </FormContainer>
    </>
  )
}

export default ProductEditScreen