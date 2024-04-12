import sharp from 'sharp';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import {validationResult} from 'express-validator';
const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);

  //const [filename, extension] = req.file.filename.split('.');

  sharp(req.file.path).
    resize(160, 160).
    png().
    toFile(`${req.file.path}_thumb`).then(() => { next(); });
};

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
};
const validationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
    .array()
    .map((error) => `${error.path}: ${error.msg}`)
    .join(', ');
    const error = new Error(messages);
    error.status = 400;
    next(error);
    return;
  }
  next();
}

export {createThumbnail, authenticateToken, notFoundHandler, errorHandler, validationErrors};
