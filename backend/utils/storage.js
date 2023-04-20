const multer = require('multer');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
  }
});

const imageFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
   cb(null, true); 
  }
  else {
    cb(null, fale);
  }
}

const upload = multer({storage: imageStorage, fileFilter: imageFilter});

module.exports = upload;