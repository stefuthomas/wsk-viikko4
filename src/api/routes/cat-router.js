import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  updateCat,
  deleteCat,
  getCatsByUserId,
} from '../controllers/cat-controller.js';

import { createThumbnail, authenticateToken } from '../../middlewares.js';

const upload = multer({ dest: 'uploads/' }); // configure multer to store files in 'uploads/' directory

const catRouter = express.Router();

catRouter.route('/')
.get(getCat)
.post(upload.single('file'), createThumbnail, postCat); // use multer middleware for file upload

catRouter.route('/:id')
.get(authenticateToken, getCatById)
.put(authenticateToken, updateCat)
.delete(authenticateToken, deleteCat);


catRouter.route('/user/:user_id')
.get(getCatsByUserId);

export default catRouter;
