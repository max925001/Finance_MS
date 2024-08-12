import { useState } from 'react'
import {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Incomes from './pages/Incomes'
import Expenses from './pages/Expenses'
import ResetPassword from './pages/ResetPassword'
import SetPassword from './pages/SetPassword'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'

function App() {

const ResetPasswordToken =JSON.parse( localStorage.getItem("resetPasswordToken"))
console.log(ResetPasswordToken)
const pathWithToken = `/newPassword/${ResetPasswordToken}`;
  return (
    <BrowserRouter>
   <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/profile' element={<Profile/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/income' element={<Incomes/>}/>
      <Route path='/expenses' element={<Expenses/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path={pathWithToken} element={<SetPassword/>}/>
      
    </Routes>
   
    </BrowserRouter>
  )
}

export default App
