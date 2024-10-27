import dotenv from "dotenv"
dotenv.config();
import products from "./data/products.js";
import Product from "./models/productModel.js";
import color from "colors";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import users from "./data/user.js";
import connectDB from "./config/db.js";


connectDB();

const importData = async() => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createUser = await User.insertMany(users);
        const userAdmin = createUser[0]._id;
        const sampleProdt = products.map((product) => {
            return {...product, user:userAdmin}
        })
        
        await Product.insertMany(sampleProdt);

        console.log('Data imported!'.green.inverse);
        process.exit();
        }catch(e){
             console.log(`Error: ${e.message}`.red.inverse);
             process.exit(1)
        }
    }

    const deleteData = async () =>{
       try {
         await Order.deleteMany();
         await Product.deleteMany();
         await User.deleteMany();
         console.log('Data destroyed!'.green.inverse);
         process.exit()
       } catch (error) {
           console.log(`Error: ${error.message}`.red.inverse);
           process.exit(1)
       }
    }



if(process.argv[2] === "-d") {
    deleteData();
}else {
   importData();
}