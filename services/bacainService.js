const pool = require("../config/db");

// BOOKS
async function getAllBooks() {
  const result = await pool.query("SELECT * FROM books ORDER BY book_id ASC");
  return result.rows;
}
async function getBooksById(id) {
  const result = await pool.query("SELECT * FROM books WHERE book_id = $1", [
    id,
  ]);
  return result.rows[0];
}

async function addBooks(data) {
  const { title, author, blurb, genre, status } = data;
  const result = await pool.query(
    "INSERT INTO books (title, author, blurb, genre, status ) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [title, author, blurb, genre, status]
  );
  return result.rows[0];
}
async function updateBooks(id, data) {
  const { title, author, blurb, genre, status } = data;
  const result = await pool.query(
    `UPDATE books
SET title = $1, author = $2, blurb = $3, genre = $4, status = $5
WHERE book_id = $6
RETURNING *`,
    [title, author, blurb, genre, status, id]
  );
  return result.rows[0];
}

async function deleteBooks(id) {
  const result = await pool.query(
    "DELETE FROM books WHERE book_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

// USERS
async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users ORDER BY user_id ASC");
  return result.rows;
}

async function getUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  return result.rows[0];
}

async function addUser(data) {
  const { name, email, password, nohp } = data;
  const result = await pool.query(
    "INSERT INTO users (name, email, password, nohp) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, password, nohp]
  );
  return result.rows[0];
}

async function updateUser(id, data) {
  const { name, email, password, nohp } = data;
  const result = await pool.query(
    `UPDATE users
SET name = $1, email = $2, password = $3, nohp = $4
WHERE user_id = $5
RETURNING *`,
    [name, email, password, nohp, id]
  );
  return result.rows[0];
}

async function deleteUser(id) {
  const result = await pool.query(
    "DELETE FROM users WHERE user_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

// ADMINS
async function getAllAdmins() {
  const result = await pool.query("SELECT * FROM admins ORDER BY admin_id ASC");
  return result.rows;
}

async function getAdminById(id) {
  const result = await pool.query("SELECT * FROM admins WHERE admin_id = $1", [
    id,
  ]);
  return result.rows[0];
}

async function addAdmin(data) {
  const { admin_name, admin_email, password } = data;
  const result = await pool.query(
    "INSERT INTO admins (admin_name, admin_email, password) VALUES ($1, $2, $3) RETURNING *",
    [admin_name, admin_email, password]
  );
  return result.rows[0];
}

async function updateAdmin(id, data) {
  const { admin_name, admin_email, password } = data;
  const result = await pool.query(
    `UPDATE admins
SET admin_name = $1, admin_email = $2, password = $3
WHERE admin_id = $4
RETURNING *`,
    [admin_name, admin_email, password, id]
  );
  return result.rows[0];
}

async function deleteAdmin(id) {
  const result = await pool.query(
    "DELETE FROM admins WHERE admin_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

module.exports = {
  getAllBooks,
  getBooksById,
  addBooks,
  updateBooks,
  deleteBooks,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getAllAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdmin,
};
