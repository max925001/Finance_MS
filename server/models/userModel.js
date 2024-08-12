import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
const userSchema = new Schema({

username:{
    type:String,
    unique:true,
    required:true
    
},
fullName:{
    type:String,
    required:true

},
email:{

    type:String,
    // unique:true,
    // required:true

},
Avatar:{
   
        type:String,
},
password:{
    type:String,
    required:true

},
TotalIncome:{

    type: Number,
    default:0
},

resetPasswordToken: { type: String,
    default:undefined

 },
resetPasswordExpires: { type: Date,
    default:undefined

 },




},{
    timestamps: true
})





userSchema.pre("save", async function(next){
if(!this.isModified("password")){
    return next()
}
this.password = await bcrypt.hash(this.password,10)
return next()
})



userSchema.methods ={
    generateJWTtoken:  async function(){
        return await Jwt.sign(
            {
                id: this._id ,email: this.email,
               username: this.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
,
comparePassword: async function(plaintextPassword){
// console.log("pass",plaintextPassword)

    return  await bcrypt.compare(plaintextPassword,this.password)
},






}






const User = mongoose.model("User",userSchema)
export default User
