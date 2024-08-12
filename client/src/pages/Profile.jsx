import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Profile() {
    const {isLoggedIn, data} = useSelector((state) =>state?.auth)
    console.log("userdata",data)
  return (
    <div className='w-full relative top-[71px] h-[85vh]  p-2 '>
    <div className='w-full h-[80vh] bg-purple-500 md:w-[600px] m-auto rounded shadow-[0_0_10px]'>

<div className='w-full h-[30vh] '><img src={data.Avatar} alt="" className='w-40 h-40 rounded-full m-auto border border-red-300 shadow-md ' /></div>

<div className='flex w-full flex-col justify-between items-center h-[40vh]'>
    <div className='w-full p-4'><h2 className='w-full'>Fullname : {data.fullName}</h2></div>
    <div className='w-full p-4'><h2 className='content-center'>Email : {data.email}</h2></div>
    <div className='w-full p-4'><h2 className='content-center'>Username : {data.username}</h2></div>
    <div className='w-full p-4'><button className='w-full h-8 bg-red-500 rounded cursor-pointer hover:bg-red-400'><Link to='/reset-password'>Reset Password</Link></button></div>
</div>

    </div>
      
    </div>
  )
}

export default Profile
