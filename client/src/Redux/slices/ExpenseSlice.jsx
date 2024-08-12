import {createAsyncThunk ,createSlice} from '@reduxjs/toolkit'
import Incomes from '../../pages/Incomes'
import axiosinstance from '../../helpers/axiosinstance'
import toast from 'react-hot-toast'
const initialState ={

   Expenses: []

}



export const CreateExpense = createAsyncThunk("incomes/createxpense" , async(data) =>{
console.log("income",data)
try{
    const res = axiosinstance.post("income/expense" ,data)
    console.log("resincome",res)
    toast.promise(res,{
    
        loading: "Wait Add your data",
        success: (data) =>{
           return data?. data?. message 
        },
        error: "Failed to create data"
    })
    
    return (await res).data
    
    }catch(error){
    
    toast.error(error?. response?. data?. message)
    }
    
})

 export const getExpenseDetails = createAsyncThunk("/expense/getExpenseDetails" ,async () =>{
  try {


const res = axiosinstance.get("/income/getexpensedetails")
console.log("expensedetails",res)
toast.promise(res,{

loading:"Data loading please wait!",
success: (data) =>{

  return data?. data?. message
},
error: "Failed to get data"



})

   return (await res).data 
  } catch (error) {
     
    toast.error(error?. response?. data?. message)
  }
})



export const deleteExpense = createAsyncThunk("income/delete" ,async(id) =>{

const res = axiosinstance.delete(`income/expense/${id}`)
toast.promise(res ,{

loading:"Data Expense Deleting please wait!",
success: (data) =>{

  return data?. data?. message
}
,
error: "Failed to delete data"
})
return (await res).data 
})

export const ExpenseSlice = createSlice({

  name:"expense",
  initialState,
  reducers:{},
  extraReducers: (builder) =>{

builder.addCase(getExpenseDetails.fulfilled,(state,action)=>{

console.log("expense",action.payload)

  if(action.payload){
    console.log(action.payload)
    state.Expenses = [...action.payload.data]
}

})




  }

})

export const {} = ExpenseSlice.actions

export default ExpenseSlice.reducer