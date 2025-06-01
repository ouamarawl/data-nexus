const multer = require("multer");
const path = require("path");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../utils/Assets")); // Correction du chemin d'upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp as filename
  },
});

// Filter to allow only image files and limit file size
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]; // Types autorisés
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers image JPG, PNG, GIF, WEBP sont autorisés !"), false);
  }
};

// Create the upload middleware with file size limit (2 Mo max)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2 Mo
});

module.exports = upload;