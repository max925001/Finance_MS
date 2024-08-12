import {createAsyncThunk ,createSlice} from '@reduxjs/toolkit'
import Incomes from '../../pages/Incomes'
import axiosinstance from '../../helpers/axiosinstance'
import toast from 'react-hot-toast'
const initialState ={

   Incomes: []

}



export const createIncomes = createAsyncThunk("incomes/createincomes" , async(data) =>{
console.log("income",data)
try{
    const res = axiosinstance.post("income/finance" ,data)
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

 export const getIncomeDetails = createAsyncThunk("/income/getIncomeDetails" ,async () =>{
  try {


const res = axiosinstance.get("/income/getincomeDetails")

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



export const deleteIncome = createAsyncThunk("income/delete" ,async(id) =>{

const res = axiosinstance.delete(`income/${id}`)
toast.promise(res ,{

loading:"Data Deleting please wait!",
success: (data) =>{

  return data?. data?. message
}
,
error: "Failed to delete data"
})
return (await res).data 
})

export const IncomeSlice = createSlice({

  name:"incomes",
  initialState,
  reducers:{},
  extraReducers: (builder) =>{

builder.addCase(getIncomeDetails.fulfilled,(state,action)=>{

console.log("income",action.payload)

  if(action.payload){
    console.log(action.payload)
    state.Incomes = [...action.payload.data]
}

})




  }

})

export const {} = IncomeSlice.actions

export default IncomeSlice.reducer