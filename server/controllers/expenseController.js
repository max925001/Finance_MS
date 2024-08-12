
import Expense from "../models/expensesModel.js";
// import Finan from '../models/financeModel.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import Finance from "../models/financeModel.js"



 const createExpense = async (req, res) => {

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

const userID = req.user.id

const Income = await Finance.find({user:userID})
const expense = await Expense.find({user:userID})

if(!Income){

  return  res.status(400).json({

        success:false,
        message:"Somethings Went Wrong"
  })
}
console.log(Income)

 let totalIncome =Income.reduce((acc,income) =>{
return acc+=income.amount
},0)

let totalExpense =expense.reduce((acc,expense) =>{
  return acc+=expense.amount
  },0)
  console.log(totalExpense)
  totalExpense = totalExpense+Number(amount)
  console.log(totalExpense)

if( totalIncome==0 ||    totalIncome<Income.amount  || amount<=0 || totalIncome<totalExpense){

  return  res.status(400).json({

        success:false,
        message:"Insufficient Balance"
  })
}

const finance = await Expense.create({
user:req.user.id,
  category,
  amount,
  
})

if(!finance){

  return  res.status(400).json({

        success:false,
        message:"Failed to create Expense"
  })
}

await finance.save()



res.status(200).json(new ApiResponse(200,finance,"Expenses created successfully"))




}




const getExpenseDetails = async (req,res)=>{

  const userId = req.user.id
  
  const userExpense = await Expense.find({user:userId})
  console.log(userExpense)
  
  if(!userExpense){
  
    return  res.status(400).json({
  
          success:false,
          message:"No Expense Found"
    })
  }
  if(userExpense.length==0){
  
    return  res.status(400).json({
  
          success:false,
          message:"No Expense Found"
    })
  }
  
  res.status(200).json(new ApiResponse(200,userExpense,"User Expense Details Load successfully"))
  
  }



  const deleteExpense = async(req,res) =>{
    const {id} = req.params
    console.log(id)
    
    
    const Expenses = await Expense.findByIdAndDelete(id)
    
  if(!Expenses)
    
    return  res.status(400).json({
    
          success:false,
          message:"Expense not found"
    })
    
    res.status(200).json(

        new ApiResponse(200,Expenses,"Expense Data Delete successfully")
    )
    
    
    
    }
    


export {createExpense ,getExpenseDetails ,deleteExpense}