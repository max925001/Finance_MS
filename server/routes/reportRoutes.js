// backend/routes/reportRoutes.js
import express from 'express';
import { generateReport } from '../controllers/reportController.js';


const reportrouter = express.Router();

reportrouter.post('/getreport', generateReport);

export default reportrouter;
