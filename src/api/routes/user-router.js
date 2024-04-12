import express from 'express';
import multer from 'multer';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

import {body} from 'express-validator';
import {validationErrors} from '../../middlewares.js';

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});
const userRouter = express.Router();

userRouter.route('/')
.get(getUser)
.post(
  body('email').trim().isEmail(),
  body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
  body('password').trim().isLength({min: 8}),
  validationErrors,
  postUser
);

userRouter.route('/:id')
.get(getUserById).put(putUser)
.delete(deleteUser);

export default userRouter;
