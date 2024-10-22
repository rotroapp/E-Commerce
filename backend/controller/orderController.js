import asyncHandler from "../middleware/AsyncHandler.js";
import Order from "../models/orderModel.js";
import ErrorResponse from "../util/ErrorResonse.js";


//@dec Create new Order
//@route POST/api/orders
//@access PRIVATE
export const addOrderItems = asyncHandler(async (req, res,next) => {
    const {
        cartItems,shippingAdd,paymentMethod,itemsPrice, taxPrice, shippingPrice, totalPrice
    } = req.body


    if(!cartItems || cartItems.length === 0)
    {
        return next(new ErrorResponse(400 , 'Order Items are missing!'))
    }else{
         const order = new Order({
            orderItems: cartItems.map(x => ({
                name:x.name,
                price:x.price,
                qty:x.qty,
                product:x._id,
                image:x.image,
                _id:undefined,
            })),
            shippingAddress:shippingAdd,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user:req.user._id,
         })

         
         const createOrder = await order.save();
         res.status(201).json(createOrder)
    }
})

//@dec Create new Order
//@route GET/api/orders
//@access PRIVATE
export const getOrderItems = asyncHandler(async (req, res,next) => {

    // const orders = await 
    res.send("get order items")
})


//@dec get logged in user orders
//@route GET /api/orders/myorders
//@access PRIVATE
export const getMyOrders = asyncHandler(async (req, res,next) => {
    const orders = await Order.find({user: req.user._id})
    res.status(200).send(orders)
})

//@dec Create new Order
//@route POST/api/orders/:id
//@access PRIVATE
export const getOrderById = asyncHandler(async (req, res,next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email');

    if(order){
    res.status(200).send(order);
    }else{
       return (next(new ErrorResponse(404,"Order not Found")))
    }

})


//@dec update Order to paid
//@route POST/api/orders/:id/pay
//@access PRIVATE
export const updateorderToPaid = asyncHandler(async (req, res,next) => {
   const order = await Order.findById(req.params.id);
 
   if(order){
    order.isPaid = true;
    order.paidAt = new Date().toLocaleString();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
    }
    const updateOrder = await order.save();
    res.status(200).send(updateOrder);

    }else{
     return next(new ErrorResponse(404, "Order not found"))
   }
   
});

//@dec update Order to paid
//@route POST/api/orders/:id/deliver
//@access PRIVATE/ADMIN
export const updateorderToDelivered = asyncHandler(async (req, res,next) => {
    const id = req.params.id;
    
    const order = await Order.findById(id)

    if(!order) return next(new ErrorResponse(400, "Order not found"))
    
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedorder = order.save();
    res.status(200).json(updatedorder);
});


//@dec get orders
//@route GET/api/orders/
//@access PRIVATE/ADMIN
export const getorders = asyncHandler(async (req, res,next) => {
    const orders = await Order.find({}).populate('user', 'id name');

    res.status(200).json(orders)
});


 
 