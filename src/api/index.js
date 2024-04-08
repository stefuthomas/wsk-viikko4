import express from 'express';
import catRouter from './routes/cat-router.js';

const router = express.Router();

router.use('/cats', catRouter);

export default router;
