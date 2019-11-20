const multer = require('multer');
const uuid = require('uuid');


const multerOptions = {
  storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
      const isPhoto = file.mimetype.startsWith('image/')
        if (isPhoto) {
          next(null, true)
        } else {
          next(errors.push({msg: 'That File Type Is Not Allowed'}), false)
        }
      }
}

exports.uploads = multer(multerOptions).single('photo');

exports.resize = async (req, res, next){
  if (!req.file) {
    next();
  }
};
