import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createIncomes, getIncomeDetails } from "../Redux/slices/IncomeSlice";
import { Link, useNavigate } from "react-router-dom";
import UserIncomData from "../components/UserIncomData";
import { getUserDetails } from "../Redux/slices/AuthSlice";
import { CreateExpense, getExpenseDetails } from "../Redux/slices/ExpenseSlice";
import UserExpenseData from "../components/UserExpenseData";

function Expenses() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const expense = useSelector((state) =>state.expenses)
  
  console.log(expense)
  const [expenseDetails, setexpenseDetails] = useState({
    category: "",
    amount: "",
  });
  console.log(expenseDetails.category ,expenseDetails.amount)
  const handlecategory = (e) => {
    setexpenseDetails({
      ...expenseDetails,

      category: e.target.value,
    });
  };

  const handleAmount = (e) => {
    setexpenseDetails({
      ...expenseDetails,

      amount: e.target.value,
    });
  };


  const handleExpenseAdd = async (e) => {
   

    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please login to add expense");
      return
    }

    if (!expenseDetails.category || !expenseDetails.amount) {
      toast.error("Please fill all the details");
      return;
    }

    const numericAmount = Number(expenseDetails.amount);
    if (isNaN(numericAmount)) {
      toast.error("Amount must be a number");
      return;
    }

    const response = await dispatch(CreateExpense(expenseDetails));
    if (response?.payload?.success) {
       await dispatch(getUserDetails())
       await dispatch(getExpenseDetails())
       toast.success("Expense added successfully");
       setexpenseDetails({
        category: "",
        amount: "",
       })
    }
  };
  return (
    <div className="w-full h-[100vh] md:h-[85vh]  relative top-[71px]">
      <div className="w-full md:h-[85vh]  flex flex-col md:flex-row ">
        <div className="w-full h-[400px] md:h-[80vh] md:w-1/4 flex flex-col justify-center bg-purple-500 rounded mt-2">
          <div className="w-full p-3 ">
            <h1 className="m-auto text-center text-black font-bold text-xl">
              Add Your Expense
            </h1>
          </div>
          <form onSubmit={handleExpenseAdd}>
            <div className="w-full p-3">
              <select
                name="category"
                id=""
                className="bg-red-500 w-full h-9 text-white rounded cursor-pointer"
                value={expenseDetails.category}
                onChange={handlecategory}
              >
                <option value="">Select Option</option>
                <option value="Shopping">Shopping</option>
                <option value="Travelling">Travelling</option>
                <option value="Stack Market">Stack Market</option>
                <option value="Eating">Eating</option>
                <option value="Water">Water</option>
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Other Expenses">Other</option>
              </select>
            </div>
            <div className="w-full p-3">
              <input
                name="amount"
                value={expenseDetails.amount}
                onChange={handleAmount}
                type="text"
                placeholder="Enter Your amount"
                className="w-full h-9 text-white rounded bg-red-500 placeholder-white "
              />
            </div>
            <div className="w-full p-3">
              {isLoggedIn ? (
                <button
                  type="submit"
                  className="w-full h-9 text-white rounded bg-yellow-500"
                >
                  Add
                </button>
              ) : (
                <h2 className="w-full h-9 text-white rounded bg-yellow-500 text-center p-1">
                  Login first
                  <Link to="/login">
                    <span className="text-blue-800 cursor-pointer"> login</span>
                  </Link>
                </h2>
              )}
            </div>
          </form>
        </div>

        <div className="w-full bg-green-400 h-[700px] md:h-[80vh] md:w-3/4 mt-2 rounded">
          {(isLoggedIn && expense.length !=0)?<UserExpenseData/>:"No data found"}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
