import {
  addCat,
  findCatById,
  listAllCats,
  getCatsByUserId as getCatsByUserIdModel,
  modifyCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const getCatsByUserId = async (req, res) => {
  if (!req.params.user_id) {
    return res.status(400).send('User ID is required');
  }
  const cats = await getCatsByUserIdModel(req.params.user_id);
  if (cats.length > 0) {
    res.json(cats);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  req.body.filename = req.file.filename; // add this line
  req.body.birthdate = new Date(req.body.birthdate).toISOString().slice(0, 10);
  const result = await addCat(req.body);
  console.log(req.body);
  console.log(req.file);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id, res.locals.user);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteCat = (req, res) => {
  res.sendStatus(200);
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatsByUserId};
