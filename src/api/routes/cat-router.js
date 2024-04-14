import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  updateCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import { createThumbnail } from '../../middlewares.js';

const upload = multer({ dest: 'uploads/' }); // configure multer to store files in 'uploads/' directory

const catRouter = express.Router();

catRouter.route('/')
.get(getCat)
.post(upload.single('file'), createThumbnail, postCat); // use multer middleware for file upload

catRouter.route('/:id')
.get(getCatById)
.put(updateCat)
.delete(deleteCat);

export default catRouter;
