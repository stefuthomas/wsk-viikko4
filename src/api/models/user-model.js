import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?', [id]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  console.log('user', user);
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role].map((item) => {
    console.log('item', item);
    if (item === undefined) {
      return null;
    } else {
      return item;
    }
  });
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {user_id: rows[0].insertId};
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`,
    [user, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);

    const sql = connection.format('DELETE FROM wsk_users WHERE user_id = ?', [id]);
    const [result] = await connection.execute(sql);

    if (result.affectedRows === 0) {
      return {
        message: 'error',
      };
    }

    await connection.commit();

    return {
      message: 'success',
    };
  } catch (error) {
    await connection.rollback();
    console.log('error', error);
    return {
      message: 'error',
    };
  } finally {
    connection.release();
  }
}

const getUserByUsername = async(username) => {
  const sql = `SELECT *
              FROM wsk_users
              WHERE username = ?`;
  const [rows] = await promisePool.execute(sql, [username]);
  if(rows.length === 0) {
    return false;
  }
  return rows[0];
}


export {listAllUsers, findUserById, addUser, modifyUser, removeUser, getUserByUsername};

/*
const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3602,
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'password',
  },
  {
    user_id: 3603,
    name: 'John Smith',
    username: 'johnsmith',
    email: 'johnny@metropolia.fi2',
    role: 'user',
    password: 'password',
  }
];


const listAlLUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({user_id: newId, name, username, email, role, password});
  return {user_id: newId};
};

export {listAlLUsers, findUserById, addUser};
*/
