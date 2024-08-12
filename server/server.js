import { config } from "dotenv";
config()

import app from "./app.js";
import connectToDB from "./config/conn.js";

const PORT = process.env.PORT || 4000




app.listen(PORT, async() =>{
    await connectToDB()
    console.log(`Server is start at port no ${PORT}`)
})








