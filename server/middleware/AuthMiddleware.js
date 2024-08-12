import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
 const isLoggin = async (req,res,next) =>{
const {token} = req.cookies
if(!token){
    return res.status(401).json({message: "You are not logged in" })
}
const userDetails = await jwt.verify(token ,process.env.JWT_SECRET)
req.user =userDetails
next()


}



export {isLoggin}