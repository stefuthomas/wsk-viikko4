import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';
import { getCatsByUserId } from './controllers/cat-controller.js';

const router = express.Router();

router.use('/cats', catRouter);
router.use('/users', userRouter)
router.route('/user/:user_id').get(getCatsByUserId);


export default router;
