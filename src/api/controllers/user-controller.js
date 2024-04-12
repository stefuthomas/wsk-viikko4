import {addUser, findUserById, listAllUsers} from '../models/user-model.js';
import bcrypt from 'bcrypt';

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

const postUser = async (req, res) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result= await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
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
