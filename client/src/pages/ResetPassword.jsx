import React, { useState } from "react";
import { resetPassword } from "../Redux/slices/AuthSlice";
import { useDispatch } from "react-redux";

function ResetPassword() {
    const dispatch = useDispatch()
const [resetpassword, setResetPassword] = useState({

    email:""
})
  console.log(resetpassword)


  const handleInput = (e) => {
    const { name, value } = e.target;
    setResetPassword({ ...resetpassword, [name]: value });
  }
   const handleEmail = async(e)=>{

e.preventDefault()
console.log("helo")
const response = await dispatch(resetPassword(resetpassword))


console.log(response)


   }
  return (
    <div className="w-full h-[89vh] relative top-[71px] flex justify-center items-center">
      <div className="w-[320px] h-[200px] bg-slate-400 rounded shadow-sm">
        <form onSubmit={handleEmail}>
          <label htmlFor="email">
            <h2 className="text-center p-2  text-white">
              Enter Your Email Which is Registered
            </h2>
          </label>
          <input

            type="text"
            name="email"
            placeholder="Enter your email"
            id="email"
            className="w-full mt-3 text-center text-white bg-red-500 h-11 border-none outline-none placeholder:text-white"
            value={resetpassword.email}
            onChange={handleInput}
          />
          <button className="w-full bg-yellow-500 text-white h-11 mt-3 relative  text-center p-2 text-[18px]" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
