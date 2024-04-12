import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsByUserId,
} from '../controllers/cat-controller.js';

import {
  createThumbnail,
  authenticateToken,
  validationErrors,
} from '../../middlewares.js';

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // only allow images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});
const catRouter = express.Router();

catRouter
.route('/')
.get(getCat)
.post(
  authenticateToken,
  upload.single('file'),
  createThumbnail,
  validationErrors,
  postCat);

catRouter.route('/:id')
.get(authenticateToken, getCatById)
.put(authenticateToken, putCat)
.delete(authenticateToken, deleteCat);


catRouter.route('/user/:user_id')
.get(getCatsByUserId);

export default catRouter;
