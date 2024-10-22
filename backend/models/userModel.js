import mongoose, { Schema } from "mongoose";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken"


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
             validator: function(v){
               return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v)
             },
        message: (props) => `${props.value} is not a valid email.`
        },
    },

    password: {
        type: String,
        required: true,
        minlength: [4, "Passord is too short!"],
        select:false
    },

    // currentPassword: {
    //     type: String,
    //     minlength: [4, "Passord is too short!"],
    // },

    isAdmin:{
         type: Boolean,
         default: false,
    }
},{
    timestamps: true
})


userSchema.methods.checkPassword = async function(currPswd) {
    return await bycrpt.compareSync(currPswd, this.password)
}

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) next();
    const salt = bycrpt.genSaltSync(10);
    this.password = await bycrpt.hash(this.password, salt);
})

userSchema.methods.signToken =  function() {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET,
        {
          expiresIn: '30d'
        });
}

const User = mongoose.model("User",userSchema);
export default User;