// backend/utils/generatePDF.js
import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generatePDF = (data, filepath) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(filepath);

            doc.pipe(stream);

            doc.fontSize(16).text('Financial Report', { align: 'center' });
            data.forEach((item) => {
                doc.fontSize(12).text(`Date: ${item.date}, Amount: ${item.amount}, Category/Source: ${item.category || item.source}`);
            });

            doc.end();

            stream.on('finish', () => {
                console.log('PDF created successfully');
                resolve();
            });

            stream.on('error', (err) => {
                console.error('Error writing PDF:', err);
                reject(err);
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            reject(error);
        }
    });
};
