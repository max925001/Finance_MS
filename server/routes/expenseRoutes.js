import express, { Router } from 'express'
import { createFinance } from '../controllers/financeController.js'
import { isLoggin } from '../middleware/AuthMiddleware.js'
import { createExpense, deleteExpense, getExpenseDetails } from '../controllers/expenseController.js'

const ExpenseRouter = Router()



ExpenseRouter.post('/expense',isLoggin, createExpense)
ExpenseRouter.get('/getexpensedetails',isLoggin, getExpenseDetails)
ExpenseRouter.delete('/expense/:id',isLoggin, deleteExpense)


export default ExpenseRouter
