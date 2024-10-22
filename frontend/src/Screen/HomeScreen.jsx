import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ProductCards from "../components/Cards";
import axios from "axios";
import { useGetProductsQuery } from "../store/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
// text-secondary
const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  const { data:products, error, isLoading } = useGetProductsQuery("");
   console.log("ero>",error);
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
      {error ? (
        <Message variant={"danger"}>Error: {error.status}</Message>
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-secondary">Latest Products</h3>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <ProductCards key={product._id} product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
