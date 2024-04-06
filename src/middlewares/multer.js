const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the file system module


// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/'; // Destination folder for uploaded files
    // Check if the uploads folder exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Set filename to be unique by appending current timestamp
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer
exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // File size limit (1 MB in this example)
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}) // 'image' is the name of the field in your form

// Check file type (for example, allow only images)
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only images (jpeg/jpg/png) are allowed!');
  }
}