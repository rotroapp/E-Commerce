import  dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import ErrorResponse from "./util/ErrorResonse.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import orderRouter from "../backend/routes/orderRoutes.js"

const PORT = process.env.PORT || 8000;
connectDB();  //connect Mongo DB

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//cookie parser middleware
app.use(cookieParser())

app.use('/api/order',orderRouter)
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);
app.get('/api/config/paypal', (req,res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})



app.listen(PORT, () => console.log(`Listening to port ${PORT}`));