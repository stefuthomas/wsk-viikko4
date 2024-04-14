import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  deleteCat,
  updateCat,
} from '../controllers/cat-controller.js';

const upload = multer({ dest: 'uploads/' }); // configure multer to store files in 'uploads/' directory

const catRouter = express.Router();

catRouter.route('/')
.get(getCat)
.post(upload.single('file'), postCat); // use multer middleware for file upload

catRouter.route('/:id')
.get(getCatById)
.put(updateCat)
.delete(deleteCat);

export default catRouter;
