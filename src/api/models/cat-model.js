import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(`
    SELECT wsk_cats.*, wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
  `);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  console.log('cat', cat);
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate].map((item) => {
    console.log('item', item);
    if (item === undefined) {
      return null;
    } else {
      return item;
    }
  })
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: rows[0].insertId};
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [cat, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const getCatsByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?', [userId]);
  return rows;
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat, getCatsByUserId};

/*
// mock data
const catItems = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
];

const listAllCats = () => {
  return catItems;
};

const findCatById = (id) => {
  return catItems.find((item) => item.cat_id == id);
};

const addCat = (cat, file) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const newId = catItems[0].cat_id + 1;
  catItems.unshift({cat_id: newId, cat_name, weight, owner, filename, birthdate, file});
  return {cat_id: newId, file};
};

export {listAllCats, findCatById, addCat};
*/
