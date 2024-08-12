import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteIncome, getIncomeDetails } from "../Redux/slices/IncomeSlice";
import { getUserDetails } from "../Redux/slices/AuthSlice";
import { Link } from "react-router-dom";

function UserIncomData() {
  const dispatch = useDispatch();
  // console.log("total income" ,totalIncome)
  const { Incomes } = useSelector((state) => state.incomes);
  const totalIncome = Incomes.reduce((acc, income) => {
    return (acc += income.amount);
  }, 0);

  const reversedIncomes = [...Incomes].reverse();

  const handleDeleteIncome = async (id) => {
    console.log(id);
    const response = await dispatch(deleteIncome(id));
    console.log("now ready toget", response);
    if (response?.payload?.success) {
      await dispatch(getUserDetails());
      await dispatch(getIncomeDetails());
    }
  };
  const handleIncome = async () => {
    const response = await dispatch(getIncomeDetails());
    console.log("incomeresp", response);
    if (response?.payload?.success) {
    }
  };

  useEffect(() => {
    handleIncome();
  }, []);

  return (
    <div className="w-full h-full bg-purple-300 rounded">
      <div className="m-auto bg-white h-14 p-2 rounded-t flex items-center justify-between ">
        <div className="w-36 h-14 ml-1">
          <button className="bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 w-36 h-14 text-black">
            <Link to='/dashboard'>View DashBoard</Link>
          </button>
        </div>
        <h1 className="text-center text-black text-2xl">
          Total Income :₹ <span className="text-red-600">{totalIncome} </span>
        </h1>
      </div>
      <div className=" w-full md:w-3/4 bg-red-200  h-[600px] md:h-[60vh] m-auto relative top-5 shadow-2xl rounded">
        <div className=" w-full md:w-3/4 bg-purple-500  h-[600px] md:h-[60vh] m-auto relative  shadow-2xl rounded flex flex-col ">
          <div className="w-full bg-gray-600 h-9">
            <h1 className="text-center text-white text-xl ">Recent History</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full  border-gray-300">
              <thead>
                <tr className="">
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-right">Delete</th>
                </tr>
              </thead>
              <tbody>
                {reversedIncomes.map((ele) => (
                  <tr key={ele._id} className="border-t ">
                    <td className="py-2 px-4">{ele.category}</td>
                    <td className="py-2 px-4">{ele.amount}</td>
                    <td className="py-2 px-4">
                      {new Date(ele.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td className="py-2 px-4 text-right">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteIncome(ele._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserIncomData;
