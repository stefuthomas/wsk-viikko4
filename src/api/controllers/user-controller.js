import {addUser, findUserById, listAllUsers} from '../models/user-model.js';
import bcrypt from 'bcrypt';
import {validationResult} from 'express-validator';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res, next) => {
  // validation errors can be retrieved from the request object (added by express-validator middleware)
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    // pass the error to the error handler middleware
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const newUserId = await addUser(req.body);
  res.json({message: 'new user added', user_id: newUserId});
};

const putUser = async (req, res) => {
  if (
    res.locals.user.user_id !== Number(req.params.id) &&
    res.locals.user.role !== 'admin'
  ) {
    res.sendStatus(403);
    return;
  }
};

const deleteUser = (req, res) => {
  res.json({message: 'User item deleted.'});
};

export {getUser, getUserById, postUser, putUser, deleteUser};
