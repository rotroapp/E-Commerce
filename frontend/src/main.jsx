import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import HomeScreen from './Screen/HomeScreen.jsx';
import Products from './Screen/Products.jsx';
import { Provider } from 'react-redux';
import reduxStore from './store/redux-store.js';
import CartScreen from './Screen/CartScreen.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import RegisterScreen from './components/Register.jsx';
import ShippingScreen from './Screen/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoue.jsx';
import PaymentScreen from './Screen/PaymentScreen.jsx';
import PlaceOrderScreen from './Screen/PlaceOrderScreen.jsx';
import OrderScreen from './Screen/OrderScreen.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ProfileScreen from './Screen/ProfileScreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderListScreen from './Screen/OrderListScreen.jsx';
import ProductListScreen from './components/ProductListSCreen.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />} />
    <Route index={true} path='/product/:id' element={<Products/>}></Route>
    <Route index={true} path='/cart' element={<CartScreen />}></Route>
    <Route index={true} path='/login' element={<LoginScreen />}></Route>
    <Route index={true} path='/register' element={<RegisterScreen/>}></Route>
    <Route  path='' element={<PrivateRoute/>}>
    <Route path='/shipping' element={<ShippingScreen/>}></Route>
    <Route path='/payments' element={<PaymentScreen />}></Route>
    <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>
    <Route path='/order/:id' element={<OrderScreen />}></Route>
    <Route path='/profile' element={<ProfileScreen/>}>
    </Route>
    </Route>
    <Route path='' element={<AdminRoute/>}>
    <Route path='/admin/orderlist' element={<OrderListScreen/>}></Route>
    <Route path='/admin/productlist' element={<ProductListScreen/>}></Route>
    </Route>
    </Route> 
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={reduxStore}>
    <PayPalScriptProvider deferLoading={true}>
         <RouterProvider router={router} />
    </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
)
