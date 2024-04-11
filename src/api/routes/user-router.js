import express from 'express';
import multer from 'multer';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const upload = multer({ dest: 'uploads/' }); // configure multer to store files in 'uploads/' directory

const userRouter = express.Router();

userRouter.route('/')
.get(getUser)
.post(postUser);

userRouter.route('/:id')
.get(getUserById).put(putUser)
.delete(deleteUser);

export default userRouter;
