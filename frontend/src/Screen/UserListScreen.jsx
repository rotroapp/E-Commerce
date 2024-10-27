import React, { useDebugValue, useEffect } from 'react'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button, Table } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTimesCircle } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import { useDeleteuserMutation, useGetusersQuery } from '../store/userApiSlice';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';


const UserListScreen = () => { 
 
    const {data: users, isLoading, error,refetch} = useGetusersQuery();
    const [deleteuser, {isLoading: deleteload}] = useDeleteuserMutation();

    useEffect(()=>{
        refetch();
    },[users])
    const deleteHandler = async (id) => {
     if(window.confirm("Are you sure sure?"))
        try{
            const res = await deleteuser(id).unwrap();
            refetch();
            console.log(res)
            toast.success(res)
            }catch(err){
             toast.error(err?.data?.message || err.data.error)
            }
    }
  return (
   <>
    <h1>Users</h1>
    {isLoading ||deleteload ? <Loader />  :  error ? 
    <Message variant={"danger"}>{error.error || error.status}</Message>: (
        <Table striped hover bordered responsive className="table-sm">
         <thead>
            <tr className='text-center' >
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
            </tr>
         </thead>
         <tbody>
            {users.map((user) => (
                <tr className='text-center' key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>{user.isAdmin? (<FaCheck />) : (<FaTimesCircle />)}</td>
                    <td><LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn btn-md border-none btn-outline-secondary '><FaEdit /></Button>
                    </LinkContainer>
                    <Button variant='light' onClick={() => deleteHandler(user._id)} className='btn btn-md btn-outline-secondary ms-1'><MdDelete /></Button>
                    </td>
                </tr>
            ))}
         </tbody>
        </Table>
    )}
   </>
  )
}

export default UserListScreen;