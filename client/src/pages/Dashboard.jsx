import React, { useEffect } from 'react'
import IncomeExpensePieChart from './IncomeExpensePieChart.jsx'
import {useDispatch, useSelector} from 'react-redux'
import { getIncomeDetails } from '../Redux/slices/IncomeSlice.jsx'
import { getExpenseDetails } from '../Redux/slices/ExpenseSlice.jsx'
function Dashboard() {
  const dispatch = useDispatch()
    const {Incomes} = useSelector((state) =>state.incomes)
    const { Expenses} = useSelector((state) =>state.expenses)
   

    const handleIncomeExpense = async()=>{
      await dispatch(getIncomeDetails())
      
      await dispatch(getExpenseDetails())
      
      
   }


    useEffect(()=>{
handleIncomeExpense()

    },[])
  return (
    <div className='relative top-[71px]'>

      <IncomeExpensePieChart incomes={Incomes} expenses={Expenses} />
    </div>
  )
}

export default Dashboard
