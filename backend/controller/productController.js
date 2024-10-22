import asyncHandler from "../middleware/AsyncHandler.js"
import Product from "../models/productModel.js"
import ErrorResponse from "../util/ErrorResonse.js";

//@desc Get All Products
//@route GET/api/products
//@access Public

export const getProducts = asyncHandler(async (req, res, next) => {
      const product = await Product.find({});
      if(!product) return next(new ErrorResponse(404, "Resources Not Found"));

      res.status(200).json(product)
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
    const id = req.body.productId;
    const product = await Product.findById(id)
    if(!product) return next(new ErrorResponse(404, "Product Not Found"));
    
    await Product.deleteOne({_id:id})
    res.status(200).json("Deleted")
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