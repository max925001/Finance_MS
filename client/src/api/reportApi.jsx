// src/api/reportApi.js
export const generateReport = async (username, startDate, endDate, format) => {
    console.log( "generate",username,startDate,endDate,format)
    try {
        const response = await fetch('https://finance-ms.onrender.com/api/v1/report/getreport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, startDate, endDate, format }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error generating report:', error);
        throw error;
    }
};
