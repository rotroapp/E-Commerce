import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLoginMutation } from "../store/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredential } from "../store/authSilce";
import { toast } from "react-toastify";

const LoginScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, {isLoading}] = useLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const {userInfo} = useSelector((state) => state.auth)
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo) navigate(redirect);
    },[userInfo,redirect])

    const submitHandler = async (e) =>{
      e.preventDefault();
        
        try {
            const res = await login({email, password}).unwrap()
            console.log("eeres  ",res)
            dispatch(setCredential({...res}))
        } catch (error) {
            console.log(error)
            toast.error(error.data.error )
        }
        console.log("Submitted !!");
      
    }



    return (
        <FormContainer>
            <h1>
                Sign In
            </h1>
       <Form onSubmit={submitHandler}>
       <Form.Group controlId='email' className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email"  
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId='password' className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"  
            placeholder="Password" 
            value={password}
            onChange={(e) => setpassword(e.target.value)}/>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3" disabled={isLoading}>
            Sign In
        </Button>
       </Form>
       <Row >
        <Col style={{fontSize:"14px" }} >
         New User ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
       </Row>
    </FormContainer>
    )
}

export default LoginScreen;