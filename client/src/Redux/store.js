import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './slices/AuthSlice'
import IncomeSlice from './slices/IncomeSlice'
import ExpenseSlice from './slices/ExpenseSlice'
export const store = configureStore({
    reducer: {
        auth:AuthSlice,
    incomes:IncomeSlice,
        expenses:ExpenseSlice
        
    }
})  