// backend/controllers/reportController.js

import fs from 'fs';
import path from 'path';
import { generatePDF } from '../utils/generatePDF.js';
import { generateCSV } from '../utils/generateCSV.js';
import Expense from '../models/expensesModel.js';
import Finance from '../models/financeModel.js';
import User from '../models/userModel.js';

export const generateReport = async (req, res,next) => {
    console.log(req.body)
    const { username ,startDate, endDate, format } = req.body;
    // console.log(username)

    // const confirmationUsername = req.user.username
    // if(confirmationUsername!=username){
    //     return res.status(401).json({message: "Unauthorized access"})
    // }
    
    console.log(`Generating report for ${username}, from ${startDate} to ${endDate}, format: ${format}`);

    try {


        const user = await User.findOne({username})
        console.log(user)
        // Convert the dates from MM/DD/YYYY format to Date objects
        // const start = new Date(startDate);
        // const end = new Date(endDate);

        // Query the database for expenses and income within the date range
        const expenses = await Expense.find(
            {user:user._id}
            // date: { $gte: start, $lte: end }
        );
        const income = await Finance.find(
           {user:user._id}
            // date: { $gte: start, $lte: end }
        );

        console.log("Expense details:", expenses);
        console.log("Income details:", income);

        const data = [...expenses, ...income];

        const filename = `report_${Date.now()}.${format}`;
        const filepath = path.resolve('C:/Users/shiva/OneDrive/Documents/Backend_chai_aur_code/Finance_MS/server', filename);

        console.log(`Creating file at ${filepath}`);

        // Wait for the file to be created
        if (format === 'pdf') {
            await generatePDF(data, filepath);
        } else if (format === 'csv') {
            await generateCSV(data, filepath);
        }

        console.log(`File created successfully at ${filepath}`);

        // Attempt to send the file
        res.download(filepath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('Could not download the file');
            }

            console.log(`File sent successfully, deleting file at ${filepath}`);

            // Check if file exists before attempting to delete
            fs.access(filepath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.error('File does not exist:', err);
                } else {
                    fs.unlink(filepath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('File deleted successfully');
                        }
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: error.message });
    }
};
