import mongoose from "mongoose";
import { config } from "dotenv";
config()
const connectToDB = async ()=>{





try {
    const connectionToDb =  await mongoose.connect(process.env.MONGO_URI)
    if(connectionToDb){
        console.log("connected to db")
    }
   
    
} catch (error) {
    console.log("Mongodb connection error" ,error)
process.exit(1)

}

}




export  default connectToDB