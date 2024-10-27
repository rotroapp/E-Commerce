import React, { useEffect, useState } from 'react'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../store/userApiSlice'
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const UserEditScreen = () => {
   const {id}=useParams();
   console.log("id  ",id)
    const {data:userdata, isLoading:loadingusers,refetch, error:usererrors} = useGetUserDetailsQuery(id);
    const [updateuser, {isLoading}] = useUpdateUserMutation();
    const [name, setname] = useState("");
    const [email, setemail] = useState("")
    const [admin, setadmin] = useState(false)

    useEffect(() =>{
        if(userdata)
        {
            setname(userdata.name);
            setemail(userdata.email);
            setadmin(userdata.isAdmin)
        }
    },[userdata]);

    const submithandler = async (e) => {
        e.preventDefault();
        try {
            const res= await updateuser({_id:id,name, email, isAdmin:admin}).unwrap();
            console.log("res==> ",res)
            refetch()
            toast.success("User Updated!")
        } catch (error) {
            // console.log(error)
            toast.error(error.data.error)
        }
    }

  return ( 
    <>
    <LinkContainer to='/admin/userlist'>
    <Button variant='light' className='btn btn-outline-dark border my-3'>Go Back</Button>
    </LinkContainer>
    <FormContainer>
        <h1>
         Edit User
        </h1>
      { loadingusers || isLoading ? <Loader/> : usererrors? <Message variant={danger}></Message>:
           <Form onSubmit={submithandler}>
            <FormGroup className='mt-4' controlId='name'> 
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter your Name'  value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup className='mt-4' controlId='Email'> 
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder='Enter your Email' value={email} type='email'  onChange={(e) => setemail(e.target.value)}></Form.Control>
            </FormGroup>
            <Form.Group className="mt-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" checked={Boolean(admin)} onChange={(e) => setadmin(e.target.checked)} label="is Admin?" />
             </Form.Group>
            <Button type='submit' className='mt-4'>Save Changes</Button>
        </Form>}
    </FormContainer>
    </>
  )
}

export default UserEditScreen