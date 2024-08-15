// src/components/ReportGenerator.js
import React, { useState } from 'react';
import { generateReport } from '../api/reportApi';
import toast from 'react-hot-toast';

const ReportGenerator = () => {
    const [userId, setUserId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [format, setFormat] = useState('pdf');

    const handleGenerateReport = async () => {
        // Retrieve stored user data from localStorage
        const storedUserData = localStorage.getItem('data');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

        // Validate the username
        if (parsedUserData && parsedUserData.username === userId) {
            try {
                // Generate the report using the provided parameters
                const report = await generateReport(userId, startDate, endDate, format);
                
                // Create a download link for the report
                const url = window.URL.createObjectURL(new Blob([report]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `report.${format}`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                toast.success('Report generated successfully!');
            } catch (error) {
                toast.error('Failed to generate report');
            }
        } else {
            toast.error('Invalid username. Please try again.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4'>
            <div className='w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Generate Financial Report</h2>
                <div className='space-y-4'>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className='w-full p-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className='w-full p-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className='w-full p-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className='w-full p-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                    </select>
                    <button
                        onClick={handleGenerateReport}
                        className='w-full py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition-colors duration-300'
                    >
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportGenerator;
