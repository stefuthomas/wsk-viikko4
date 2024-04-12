import sharp from 'sharp';
import jwt from 'jsonwebtoken';
import "dotenv/config";
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

export {createThumbnail};

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

export {authenticateToken};
