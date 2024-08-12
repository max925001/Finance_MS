import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Construct __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to ensure the directory exists
const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Set up storage with multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("dirname",__dirname)
    const uploadPath = path.join(__dirname, '../uploads');
    console.log(uploadPath)
    
    ensureDirectoryExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage,
});
