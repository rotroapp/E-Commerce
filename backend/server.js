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
import uploadRouter from "../backend/routes/uploadRoutes.js"
import path from "path"

const PORT = process.env.PORT || 8000;
connectDB();  //connect Mongo DB


const app = express();
const __dirname = path.resolve();
app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
//cookie parser middleware
app.use(cookieParser())

app.use('/api/order',orderRouter)
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/upload',uploadRouter)
app.use(errorHandler);
app.get('/api/config/paypal', (req,res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

if(process.env.NODE_ENV=== 'Production')
{
    // set static folder
    app.use(express.static(path.join(__dirname,'/frontend/dist')));

    //any route that is not api will be redirect to index.html
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
    });

}else{
    app.get('/',(req,res) => {
        res.send("API is running....")
    })
}

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));