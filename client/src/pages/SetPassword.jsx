import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { newPassword } from "../Redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

function SetPassword() {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    password: "",
  });
  console.log(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Dispatch(newPassword(password));
    if (response?.payload?.success) {
      navigate("/login");
      setPassword({
        password: "",
      });
    }
    console.log(response);
  };
  return (
    <div className="w-full h-[89vh]  relative top-[71px] flex justify-center items-center">
      <div className="w-[300px] h-[300px] bg-slate-900 rounded-lg shadow-[0_0_10px]">
        <div className="w-full text-center mt-2">
          <h2 className="text-white font-[500]">Enter Your New Password</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className=" w-full text-center mt-2 flex flex-col">
            <label htmlFor="" className="text-white">
              New Password
            </label>
            <div className="w-full mt-3 p-2">
              <input
                type="password"
                className="w-full h-12 rounded-lg placeholder:text-center text-black outline-none"
                placeholder="Enter New Password"
                value={newPassword.password}
                onChange={(e) =>
                  setPassword({ ...password, password: e.target.value })
                }
              />
            </div>
            <div className="p-2 mt-2">
              <button
                className="h-12 bg-red-500 w-full rounded-lg"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetPassword;
