import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

class FileUploadHandler {
  constructor(fileFor, ...fileTypes) {
    this.fileFor = fileFor;
    this.fileTypes = fileTypes;
    this.uploadFolder = fileFor === 'user' ? 'users' : `${fileFor}`;
    this.multerStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `public/uploads/${this.uploadFolder}`);
      },
      filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${this.fileFor}-${uuidv4()}.${ext}`);
      },
    });

    this.multerFilter = (req, file, cb) => {
      if (this.fileTypes.includes(file.mimetype.split('/')[1])) {
        cb(null, true);
      } else {
        cb(new Error('Not a valid file'), false);
      }
    };
    this.getMulter = this.getMulterInstance.bind(this);
  }

  getMulterInstance() {
    const upload = multer({
      storage: this.multerStorage,
      fileFilter: this.multerFilter,
    });
    return upload;
  }

  static manageMultipleImage(req, fieldName) {
    const fileNames = [];
    req.files.forEach((file) => {
      fileNames.push(file.filename);
    });

    if (fieldName === 'images') {
      req.body.images = fileNames;
    }
  }
}

export default FileUploadHandler;
