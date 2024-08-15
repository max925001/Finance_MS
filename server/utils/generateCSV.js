// backend/utils/generateCSV.js
import fs from 'fs';
import { Parser } from 'json2csv';

export const generateCSV = (data, filename) => {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    fs.writeFileSync(filename, csv);
};
