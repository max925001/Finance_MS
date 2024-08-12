import express, { Router } from 'express'
import { createFinance, deleteIncome, getIncomeDetails } from '../controllers/financeController.js'
import { isLoggin } from '../middleware/AuthMiddleware.js'

const FinanceRouter = Router()



FinanceRouter.post('/finance',isLoggin, createFinance)
FinanceRouter.get('/getincomeDetails',isLoggin, getIncomeDetails)
FinanceRouter.delete('/:id',isLoggin,deleteIncome)

export default FinanceRouter
