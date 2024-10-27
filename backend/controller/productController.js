import  dotenv from "dotenv"
dotenv.config()
import asyncHandler from "../middleware/AsyncHandler.js"
import Product from "../models/productModel.js"
import ErrorResponse from "../util/ErrorResonse.js";

//@desc Get All Products
//@route GET/api/products
//@access Public

export const getProducts = asyncHandler(async (req, res, next) => {
      
    const pageSize = process.env.PAGESIZE;
    const page = Number(req.query.pageNumber)||1;
    // console.log("page - ", req.query.pageNumber)
   
    const keyword = req.query.keyword? {name:{$regex: req.query.keyword, $options:'i'}}:{};
    
    const count = await Product.countDocuments({...keyword});
    const product = await Product.find({...keyword})
    .limit(pageSize).skip((page-1)*pageSize);
      if(!product) return next(new ErrorResponse(404, "Resources Not Found"));

      res.status(200).json({product, page, pages:Math.ceil(count/pageSize)});
})


//@desc Get single Product
//@route GET/api/products/:id
//@access Public
export const getProduct = asyncHandler(async (req,res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id)
    if(!product) return next(new ErrorResponse(404, "Product Not Found"));

    res.status(200).json(product)
})


export const deleteProduct = asyncHandler(async (req,res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id)
    if(!product) return next(new ErrorResponse(404, "Product Not Found"));
    await Product.deleteOne({_id:id})
    res.status(200).json("Product Removed")
})


// @desc create product
//@route POST/api/products
//@access PRIVATE/Admin

export const createProduct = asyncHandler(async (req, res,next) => {
    const product = new Product({
        name: "Sample Name",
        price:0,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category:"Sample category",
        countInStock: 0,
        numReviews:0,
        description: "Sample description",
        user:req.user._id,
    })
    const createProduct = await product.save();
    res.status(201).json(createProduct);
})


export const createProductReview = asyncHandler(async(req,res,next) => {
       
    const {comment, rating} = req.body;

    const product = await Product.findById(req.params.id);

    if(!product) return next(new ErrorResponse(404, "Product Not Found"));
    
    const alreadyReview = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

    if(alreadyReview) return (next( new ErrorResponse(400, "Review Already Exist")));
    
    const review = {
        name: req.user.name,
        rating,
        comment,
        user:req.user._id
    }

    product.reviews.push(review);
    product.rating = product.reviews.reduce((acc,review) => acc + review.rating, 0)/(product.reviews.length);
    product.numReviews = product.reviews.length;

    await product.save();

    res.status(201).json("Review Added");
})


export const updateProduct = asyncHandler(async(req,res,next) =>{
    const {name,price,brand,category,image,countInStock, description} = req.body
    
    const product = await Product.findById(req.params.id);
    if(!product) return next(new ErrorResponse(404, "Product Not Found"));
    
    product.name =name;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.image = image;
    product.countInStock = countInStock;
    product.description = description;

    const updateProduct = await product.save();
    res.json(updateProduct);
});



//@desc Get single Product
//@route GET/api/products/top
//@access Public
export const getTopProducts = asyncHandler(async (req,res, next) => {
  
    const product = await Product.find({}).sort({rating: -1}).limit(3)
    res.status(200).json(product)
})
