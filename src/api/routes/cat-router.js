import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  updateCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.route('/').get(getCat).post(postCat);

catRouter.route('/:id').get(getCatById).put(updateCat).delete(deleteCat);

export default catRouter;
