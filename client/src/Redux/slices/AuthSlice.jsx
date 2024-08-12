import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosinstance from "../../helpers/axiosinstance";


const initialState ={
   isLoggedIn:JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    data:JSON.parse(localStorage.getItem("data")) || undefined,
    totalIncome:0,
    resetPassword:JSON.parse(localStorage.getItem("resetPasswordToken") ) || null
}



export const createAccount = createAsyncThunk("/auth/signup" ,async(data) =>{
    console.log("signup",data)
    try{
    const res = axiosinstance.post("user/register" ,data)
    toast.promise(res,{
    
        loading: "Wait creating your account",
        success: (data) =>{
           return data?. data?. message 
        },
        error: "Failed to create account"
    })
    
    return (await res).data
    
    }catch(error){
    
    toast.error(error?. response?. data?. message)
    }
    
    })
    
    
    
    console.log(createAccount)

    export const login = createAsyncThunk("/auth/login" ,async (data) =>{

        try{
            const res = axiosinstance.post("user/login" ,data)
            toast.promise(res,{
            
                loading: "Wait Authentication is in progress",
                success: (data) =>{
                   return data?. data?. message 
                },
                error: "Failed to Login"
            })
            
            return (await res).data
            
            }catch(error){
            
            toast.error(error?. response?. data?. message)
            }
            

    })
    


   export const logout = createAsyncThunk("/auth/logout" , async() =>{


        try{


            const res = axiosinstance.post("user/logout")
            console.log("logout" ,res)
            toast.promise(res,{
            
                loading: "Wait Logout is in progress",
                success: (data) =>{
                   return data?.data?.message 
                },
                error: "Failed to Logout"
            })
            
            return (await res).data
        
        
        
        }catch(error){
        
        toast.error(error?. response?. data?.message)
        
        
        }

    })

    export const getUserDetails = createAsyncThunk("/auth/getUserDetails", async()=>{


try {


    const res  = axiosinstance.get("/user/getUser")
    console.log("getUserDetails" ,res)
   return (await res).data
    
} catch (error) {
    toast.error(error?.response?.data?.message)
    
}

        
    })



   export const resetPassword = createAsyncThunk("auth/resetPassword" ,async(data) =>{

try {
    console.log(data)
    const res =   axiosinstance.post("user/reset-password" ,data)

    toast.promise(res,{

        loading: "please wait!",
       
        error: "Failed to Send Link"
        

    })

    return (await res).data
    
} catch (error) {
    toast.error(error?.response?.data?.message)
}




    })





   export const newPassword = createAsyncThunk("auth/newpassword",async(data)=>{
    try {
       
        const url = new URL(window.location.href);
        const token = url.pathname.split('/').pop(); 
    
        const res =  axiosinstance.post(`user/new-password/${token}`,data);
        toast.promise(res,{

            loading: "please wait!",

            error: "Failed to reset password"
        })

    return (await res).data
        
      } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
      }
   }) 
    export const AuthSlice = createSlice({
        name:"auth",
        initialState,
        reducers:{},
        extraReducers:(builder) =>{

            builder.addCase(login.fulfilled ,(state,action) =>{
console.log("action",action)
                localStorage.setItem("data" , JSON.stringify(action?. payload?.data))
                localStorage.setItem("isLoggedIn" ,true)
                state.isLoggedIn =true
                state.data = action?.payload?.data
                
                
            })

.addCase(logout.fulfilled,(state,action) =>{
    localStorage.clear()
    state.data ={}
    state.isLoggedIn =false
   
}).addCase(getUserDetails.fulfilled,(state,action)=>{
    console.log("total",action.payload)

state.totalIncome=action.payload.data.TotalIncome



}).addCase(resetPassword.fulfilled,(state ,action)=>{
    localStorage.setItem("resetPasswordToken" , JSON.stringify(action?. payload?.data.resetPasswordToken))
    toast.success(action?.payload?.message)


}).addCase(newPassword.fulfilled,(state ,action) =>{
    localStorage.clear()
    state.isLoggedIn =false
    toast.success(action?.payload?.message)
})


        }
       
    })




    
    export const {} = AuthSlice.actions;

    export default AuthSlice.reducer