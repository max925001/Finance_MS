import React, { useEffect } from "react";
import "./navbar.css";
import logo_image from "../assets/FMS-LOGO.png";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate ,} from "react-router-dom";
import { getUserDetails, logout } from "../Redux/slices/AuthSlice";
import { RxCross2 } from "react-icons/rx";
import { getIncomeDetails } from "../Redux/slices/IncomeSlice";
import toast from "react-hot-toast";
import { getExpenseDetails } from "../Redux/slices/ExpenseSlice";
function Navbar() {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const [isVisible, setIsvisible] = useState(false);
  const { isLoggedIn, data } = useSelector((state) => state.auth);
 
  console.log(isLoggedIn, data);

  const handleVisble = () => {
    console.log(isVisible);
    setIsvisible(!isVisible);
  };
  const handlelogout = async() =>{

    const response = await dispatch(logout())

    if(response?.payload?.success){

      navigator("/login")
    }
  }

  const handleIncome = async()=>{
    setIsvisible(!isVisible);
     const response =await dispatch(getIncomeDetails())
     console.log("incomeresp",response)
     if(response?.payload?.success){


     
    }
  }

 


  const handleExpense = async()=>{
    setIsvisible(!isVisible);
     const response =await dispatch(getExpenseDetails())
     console.log("incomeresp",response)
     if(response?.payload?.success){


     
    }
  }



 


  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo_image} alt="" className="logo_image" />
      </div>
      <div className={`menu ${isVisible ? "visible" : ""}`}>
        <div className="sub_menu">
          <div className="bg-red-500 p-4 flex justify-center rounded w-32 cursor-pointer hover:bg-red-400 transition-all ">
          <Link  className ='w-full content-center flex justify-center' to="/" onClick={handleVisble}>Home</Link>
          </div>
          <div className="bg-red-500 p-4 flex justify-center rounded w-32 cursor-pointer hover:bg-red-400 transition-all ">
          <Link  className ='w-full content-center flex justify-center' to="/income" onClick={handleIncome}>Income</Link>
          </div>
          <div className="bg-red-500 p-4 flex justify-center rounded w-32 cursor-pointer hover:bg-red-400 transition-all ">
          <Link  className ='w-full content-center flex justify-center' to="/expenses" onClick={handleExpense}>Expenses</Link>
          </div>
          {isLoggedIn ? (
            <div className="bg-red-500 p-4 flex justify-center rounded w-32 cursor-pointer hover:bg-red-400 transition-all "
            onClick={handlelogout}
            >
              Logout
            </div>
          ) : (
            <div className="bg-red-500 p-4 flex justify-center content-center rounded w-32 cursor-pointer hover:bg-red-400 transition-all">
            <Link  className ='w-full content-center flex justify-center' to="/signup" onClick={handleVisble}>Signup</Link></div>
          )}
          {isLoggedIn ? (
            <div className="bg-red-500 p-4 flex justify-center rounded w-32 cursor-pointer hover:bg-red-400 transition-all ">
            <Link  className ='w-full content-center flex justify-center' to="/profile" onClick={handleVisble}>Profile</Link>
            </div>
          ) : (
            <div className="bg-red-500 p-4 flex justify-center rounded w-32 cursor-pointer hover:bg-red-400 transition-all">
            <Link to='/login' className="w-full content-center flex justify-center" onClick={handleVisble}>Login</Link></div>
          )}
        </div>
      </div>
      <div className="menu_bar" onClick={handleVisble}>
       {isVisible? <RxCross2/>:<IoMdMenu/>}
      </div>
    </header>
  );
}

export default Navbar;
