import sharp from 'sharp';

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
