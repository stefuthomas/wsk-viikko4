import express from 'express';
import catRouter from './routes/cat-router.js';
import { getCatsByUserId } from './controllers/cat-controller.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';

const router = express.Router();
router.route('/user/:user_id').get(getCatsByUserId);

router.use('/cats', catRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
