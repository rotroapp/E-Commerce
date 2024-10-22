const genrateToken = (user,res,status,msg) => {
     
        const token = user.signToken();
        // console.log("token..",token)
        res.cookie('jwt', token, 
            {httpOnly: true,
            sameSite:'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30*24*60*60*1000 //30days
            })
    
        res.status(status).json(
         msg || "successful",
        )
    }


export default genrateToken