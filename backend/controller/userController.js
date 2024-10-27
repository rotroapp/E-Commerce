import asyncHandler from "../middleware/AsyncHandler.js"
import User from "../models/userModel.js";
import ErrorResponse from "../util/ErrorResonse.js";
import genrateToken from "../util/genrateToken.js";


//@desc POST User Auth
//@route POST/api/users/login
//@access Public

export const loginUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email}).select('+password')
    
    if(user && (await user.checkPassword(password))){
        const data = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }

    
        genrateToken(user,res,200, {...data});
        
    }
    else{
        return next(new ErrorResponse(401, "Invalid Email or Password"));
    }
    
})

//@desc POST User Register
//@route POST/api/users
//@access Public

export const registerUser = asyncHandler(async (req, res, next) => {
    
    const {name, email, password} = req.body;
    const usera = await User.findOne({email});
    if(usera) return (next(new ErrorResponse(400, "User Already Exist!")));


    const user = await new User({ 
        name, password, email
    })
    await user.validate();  
    await user.save();
    const data = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }
    genrateToken(user,res,201, {...data})
  
})

//////////////////////////////////////////////////////USER///////////////////////////////////////////////////////////////

//@desc POST Logout user /  clear cookie
//@route POST/api/users/logout
//@access PRIVATE

export const logoutUser = asyncHandler(async (req, res, next) => {
    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message:"Logged Out Scucessful"})
})


//@desc GET User 
//@route POST/api/users/profile
//@access PRIVATE

export const getUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if(!user)  return next(new ErrorResponse(400, "User Not Found!"));

    res.status(200).json({data:user})
})

//@desc PUT User 
//@route PUT/api/users/profile
//@access PRIVATE

export const updateUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");
    if(!user)  return next(new ErrorResponse(400, "User Not Found!"));
    
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    
    if(!req.body.currentPassword && !req.body.password) {
        await user.save();
        const data = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
        res.status(200).json({...data})
    }else if(req.body.currentPassword && (await user.checkPassword(req.body.currentPassword))){
        user.password = req.body.password || user.password;
        await user.save();
        const data = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
        genrateToken(user,res,200,{...data})
    }else{
        return next(new ErrorResponse(401, "Pls provide valid current Password"));
    }
})


//////////////////////////////////////////////////////ADMIN///////////////////////////////////////////////////////////////
//@desc Update User update profile
//@route PUT/api/users/:id
//@access PRIVATE/ADMIN

export const updateUser = asyncHandler(async (req, res, next) => {
    
    const user = await User.findById(req.params.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin) 
        
        const updateUser = await user.save();
        
        res.status(200).json({
        _id:updateUser._id,
        name: updateUser.name,
        email:updateUser.email,
        isAdmin:updateUser.isAdmin
    })
    }
    else{
        return (new next(ErrorResponse(401, "User not found!")))
    }
    
})


//@desc get users
//@route GET/api/users/
//@access PRIVATE/ADMIN

export const getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users)
})

//@desc Get User by Id
//@route GET/api/users/:id
//@access PRIVATE/ADMIN

export const getUserId = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return(next(new ErrorResponse(401, "User not Found")));
    res.status(200).json(user)
})



//@desc delete User  profile
//@route DELETE/api/users/:id
//@access PRIVATE/ADMIN

export const deleteUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return(next(new ErrorResponse(401, "User not Found")));
    if(user.isAdmin) return(next(new ErrorResponse(400, "Cannot delete Admin")))
    await User.deleteOne({_id: user._id});
    res.status(200).json('User Deleted');
})


