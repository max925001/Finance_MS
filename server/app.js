import express, { Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectToDB from './config/conn.js';
import router from './routes/userRoutes.js';
import FinanceRouter from './routes/financeRoutes.js';
import ExpenseRouter from './routes/expenseRoutes.js';

const app = express();


connectToDB()
app.use(express.json()) //use for paras
app.use(express.urlencoded({
    extended:true
}))


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Cookie'],

}))

app.use(cookieParser())

app.use(morgan('dev'))
 // ye morgan dependency se hum ye pta lga sakte hai ki mere website kaun se methods se access ho rhi hai
app.use('/ping' ,(req,res) =>{
    res.send('/pong')
})





app.use('/api/v1/user' , router)
app.use('/api/v1/income',FinanceRouter)
app.use('/api/v1/income',ExpenseRouter)






app.all('*' ,(req,res) =>{
    res.status(404).send('OPPS!! 404 page not found')
})

// app.use(errorMiddleware)

export default app