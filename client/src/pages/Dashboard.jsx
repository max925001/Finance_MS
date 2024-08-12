import React from 'react'
import IncomeExpensePieChart from './IncomeExpensePieChart.jsx'
import {useSelector} from 'react-redux'
function Dashboard() {
    const {Incomes} = useSelector((state) =>state.incomes)
    console.log("income",Incomes)
    const { Expenses} = useSelector((state) =>state.expenses)
    console.log("expense", Expenses)
  return (
    <div className='relative top-[71px]'>

      <IncomeExpensePieChart incomes={Incomes} expenses={Expenses} />
    </div>
  )
}

export default Dashboard
