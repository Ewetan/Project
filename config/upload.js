const multer = require('multer');
const uuid = require('uuid');
const jimp = require('jimp');


const multerOptions = {
  storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
      const isPhoto = file.mimetype.startsWith('image/')
        if (isPhoto) {
          next(null, true)
        } else {
          next(errors.push({ msg: 'That File Type Is Not Allowed' }), false)
        }
  }
}


exports.uploads = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.users.photo = `${uuid.v4()}.${extension}}`;

  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO)
  await photo.write(`./public/uploads/${req.user.photo}`);

  next();

};
