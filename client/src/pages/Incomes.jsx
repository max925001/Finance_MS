import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createIncomes, getIncomeDetails } from "../Redux/slices/IncomeSlice";
import { Link, useNavigate } from "react-router-dom";
import UserIncomData from "../components/UserIncomData";
import { getUserDetails } from "../Redux/slices/AuthSlice";

function Incomes() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const income = useSelector((state) =>state.incomes)
  
  console.log(income)
  const [incomeDetails, setincomeDetails] = useState({
    category: "",
    amount: "",
  });
  const handlecategory = (e) => {
    setincomeDetails({
      ...incomeDetails,

      category: e.target.value,
    });
  };

  const handleAmount = (e) => {
    setincomeDetails({
      ...incomeDetails,

      amount: e.target.value,
    });
  };


  const handleIncomeAdd = async (e) => {
   

    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please login to add income");
      return
    }

    if (!incomeDetails.category || !incomeDetails.amount) {
      toast.error("Please fill all the details");
      return;
    }

    const numericAmount = Number(incomeDetails.amount);
    if (isNaN(numericAmount)) {
      toast.error("Amount must be a number");
      return;
    }

    const response = await dispatch(createIncomes(incomeDetails));
    if (response?.payload?.success) {
       await dispatch(getUserDetails())
       await dispatch(getIncomeDetails())
       toast.success("Income added successfully");
       setincomeDetails({
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
              Add Your Income
            </h1>
          </div>
          <form onSubmit={handleIncomeAdd}>
            <div className="w-full p-3">
              <select
                name="category"
                id=""
                className="bg-red-500 w-full h-9 text-white rounded cursor-pointer"
                value={incomeDetails.category}
                onChange={handlecategory}
              >
                <option value="">Select Option</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Income">Income</option>
                <option value="Web development">Web development</option>
                <option value="Freelancing">Freelancing</option>
                <option value="Teaching">Teaching</option>
                <option value="Other Income">other</option>
              </select>
            </div>
            <div className="w-full p-3">
              <input
                name="amount"
                value={incomeDetails.amount}
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
          {(isLoggedIn && income.length !=0)?<UserIncomData/>:(<div className="text-2xl text-center"> No Data Found Please Login First <Link to="/login" className="text-blue-700">Login</Link> <link rel="stylesheet" href="" /></div>)}
        </div>
      </div>
    </div>
  );
}

export default Incomes;
