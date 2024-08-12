import Finance from "../models/financeModel.js";
import User from "../models/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";


 const createFinance = async (req, res) => {

const {category , amount,} = req.body

console.log(category,amount)

if(!category || !amount){

  return  res.status(400).json({

        success:false,
        message:"Please fill all the details"

    })
}
const numericAmount = Number(amount)
if(isNaN(numericAmount)){

  return  res.status(400).json({

        success:false,
        message:"Amount should be numeric"
  })
}

if(amount<=0){

  return  res.status(400).json({

        success:false,
        message:"Amount should be greater than 0"
  })
}
const finance = await Finance.create({
user:req.user.id,
  category,
  amount,
  
})

if(!finance){

  return  res.status(400).json({

        success:false,
        message:"Failed to create finance"
  })
}

await finance.save()

const userID = req.user.id

const user = await User.findById(userID)

if(!user){

  return  res.status(400).json({

        success:false,
        message:"User not found"
  })
}
user.TotalIncome +=numericAmount

await user.save()


res.status(200).json(new ApiResponse(200,finance,"Finance created successfully"))




}


const getIncomeDetails = async (req,res)=>{

const userId = req.user.id

const userIncome = await Finance.find({user:userId})
console.log(userIncome)

if(!userIncome){

  return  res.status(400).json({

        success:false,
        message:"No income Found!"
  })
}
if(userIncome.length==0){

  return  res.status(200).json(
new ApiResponse(200,"","No Income found")
      
)
}

res.status(200).json(new ApiResponse(200,userIncome,"User Income Details Load successfully"))

}


const deleteIncome = async(req,res) =>{
const {id} = req.params


const finance = await Finance.findById(id)




await Finance.findByIdAndDelete(id)

res.status(200).json(new ApiResponse(200,finance,"Income Data Delete successfully"))




}



export {createFinance ,getIncomeDetails ,deleteIncome}