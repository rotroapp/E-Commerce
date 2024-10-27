import mongoose, { Mongoose, Schema } from "mongoose";


const reviewSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },

    comment: {
        type: String,
        required: true,
    } ,

    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    }
},{timestamps: true,})

const productSchema = new Schema({
    
    name: {
        type: String,
        required:true,
    },

    image: {
        type:String,
        required:true,
    },

    brand: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    reviews:[reviewSchema],

    description:{
        type:String,
        required:true,
    },

    rating: {
        type:Number,
        required: true,
        default:0,
    },

    numReviews: {
        type: Number,
        required: true,
        default:0,
    },
    
    price: {
        type: Number,
        required: true,
        default:0,
    },
    countInStock: {
        type: Number,
        required: true,
        default:0,
    },

    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps:true
})


const Product = mongoose.model("product", productSchema);
export default Product;