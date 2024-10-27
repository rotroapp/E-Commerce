import {Nav,Navbar,Container, NavLink,Badge, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart , FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../store/userApiSlice';
import { resetCredential } from '../store/authSilce';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
import SearchBar from './SearchBar';
import { clearCartItems, shippingAddress } from '../store/cartSlice';

const Header = () => {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const {cartItems} = useSelector(store => store.cart);
    const {userInfo} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [loginblock, setloginblock] = useState(false)
    const {pathname} = useLocation()
   useEffect(() =>{
    
    pathname === '/login' ? setloginblock(true) : setloginblock(false);
   },[pathname])

   
    const logouthandler = async () => {

        try {
            console.log("entered 1");
            
            const res = await logout().unwrap(); // Await logout response
            // console.log("r r", res);
            
            dispatch(resetCredential()); // Reset credentials
            dispatch(shippingAddress(null)); 
            dispatch(clearCartItems());
            navigate('/login'); // Navigate to login page
            toast.success("LogOut Successful!"); // Show success toast
        } catch (e) {
            console.error(e); // Log the full error for debugging
            toast.error(e.error || "An error occurred during logout"); // Display a generic error if e.error doesn't exist
        }
        
      
    }
    return (
     <header>
        <Navbar bg='secondary ' variant='dark' expand="md">
            <Container>
            <LinkContainer to={loginblock ? '/login': '/page/1'} >
            <Navbar.Brand>
           <img src='/eos.svg' /> 
           <h1 className='fw-light fs-6 mx-1 d-inline-block'>ProShop </h1>        
            </Navbar.Brand>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto '>
            <SearchBar/>
            {userInfo && userInfo.isAdmin && (
                <NavDropdown title={<MdAdminPanelSettings size={30}/>} id='adminmenu'>
                    <LinkContainer to="/admin/productlist/1">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
            )}

            <LinkContainer disabled={loginblock} to="/cart" style={{position:"relative"}}>
            <Nav.Link >
            <FaShoppingCart style={{zIndex:"2", position:"relative"}} /> Cart
            {cartItems.length > 0 ? <Badge pill bg='primary' style={{zIndex:"0", position:"absolute", top:"-3px", left:"11px"} } >
                {cartItems.reduce((a,c) => a+c.qty,0)}
            </Badge> : ""}
            </Nav.Link>
            </LinkContainer>
            {userInfo ? (<NavDropdown   title={userInfo.name.split(" ")[0]} id="basic-nav-dropdown">
              <NavDropdown.Item  href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logouthandler} >
                Logout
              </NavDropdown.Item>
               </NavDropdown>) :(
            <LinkContainer disabled={loginblock} to='/login'>
            <Nav.Link href='/login'>
            <FaUser /> Log In
            </Nav.Link>
            </LinkContainer>)}
           </Nav>
            </Navbar.Collapse>
         </Container>
        </Navbar>
     </header>
    )
}

export default Header;
