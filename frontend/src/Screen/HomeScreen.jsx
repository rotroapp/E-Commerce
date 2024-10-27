import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ProductCards from "../components/Cards";
import { useGetProductsQuery } from "../store/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
// text-secondary
const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
 const {pageNumber, keyword} = useParams();
 console.log("page ", keyword)
 const { data, error, isLoading } = useGetProductsQuery({pageNumber,keyword});
  
 console.log("los ", isLoading);
  // useEffect(() => {
  //   ;(async() => {
  //     try{
  //       let res = await axios.get("/api/products");
  //       let {data} =  res;
  //       setProducts(data)
  //     }catch(e){
  //      console.log(e)
  //     }

  //   })()
  // },[])
  return (
    <>
    {!keyword ? <ProductCarousel /> : <Link to='/' className="btn btn-outline-secondary mb-4">Go Back</Link>}
      {error ? (
        <Message variant={"danger"}>Error: {error.status}</Message>
      ) : isLoading ? (
        <Loader/>
      ) : (
        <>
          <h3 className="text-secondary">Latest Products</h3>
          <Row>
            {data.product.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <ProductCards key={product._id} product={product} />
              </Col>
            ))}
          </Row>
          <Row className="my-4 justify-content-md-center">
              
             <Col md={1}><Paginate page={data.page} pages={data.pages} keyword={keyword? keyword: ""}/></Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
