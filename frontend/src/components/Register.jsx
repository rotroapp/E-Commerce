import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useRegisterMutation } from "../store/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredential } from "../store/authSilce";
import { toast } from "react-toastify";

const RegisterScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, {isLoading}] = useRegisterMutation();
    const [email, setEmail] = useState(""); 
    const [cfpassword, setcfpassword] = useState("")
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");
    const {userInfo} = useSelector((state) => state.auth)
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
   

    useEffect(() => {
        if(userInfo) navigate(redirect);
    },[userInfo,redirect])
   

    
    const submitHandler = async (e) =>{
      e.preventDefault();

      if(password !== cfpassword)
      {
        toast.error("Password donot match!");
      }else{

        try {
            const res = await register({name,email, password}).unwrap()
            // console.log("eeres  ",res)
            dispatch(setCredential({...res}))
        } catch (error) {
            // console.log(error)
            toast.error(error.data.error )
        }
        console.log("Submitted !!");
      }
    }



    return (
        <FormContainer>
            <h1>
               Register User
            </h1>
       <Form onSubmit={submitHandler}>
       <Form.Group controlId='name' className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name"  
            placeholder="Enter Name" 
            value={name}
            onChange={(e) => setname(e.target.value)}/>
        </Form.Group>
       <Form.Group controlId='email' className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email"  
            placeholder="Enter Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId='password' className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"  
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setpassword(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId='password' className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password"  
            placeholder="Enter Confirm Password" 
            value={cfpassword}
            onChange={(e) => setcfpassword(e.target.value)}/>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3" disabled={isLoading}>
           Submit
        </Button>
        <Row >
        <Col style={{fontSize:"14px" }} >
         Already have an account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
       </Row>
       </Form>
    </FormContainer>
    )
}

export default RegisterScreen;