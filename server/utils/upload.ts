import multer from 'multer';
import { Request } from 'express';
import { AppError } from './errorHandler';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export const uploadFields = {
  package: upload.array('images', 10),
  hotel: upload.array('images', 10),
  profile: upload.single('image')
};