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
SET title = COALESCE($1, title), 
    author = COALESCE($2, author), 
    blurb = COALESCE($3, blurb), 
    genre = COALESCE($4, genre), 
    status = COALESCE($5, status)
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
  const { username, user_email, password, nohp } = data;
  const result = await pool.query(
    "INSERT INTO users (username, user_email, password, nohp) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, user_email, password, nohp]
  );
  return result.rows[0];
}

async function updateUser(id, data) {
  const { username, user_email, password, nohp } = data;
  const result = await pool.query(
    `UPDATE users
SET username = $1, user_email = $2, password = $3, nohp = $4
WHERE user_id = $5
RETURNING *`,
    [username, user_email, password, nohp, id]
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

// BORROWINGS
async function getAllBorrowings() {
  const result = await pool.query(
    `SELECT br.*, bk.title AS book_title, u.username AS user_name, a.admin_name AS admin_name
     FROM borrowings br
     LEFT JOIN books bk ON br.book_id = bk.book_id
     LEFT JOIN users u ON br.user_id = u.user_id
     LEFT JOIN admins a ON br.admin_id = a.admin_id
     ORDER BY br.borrow_id ASC`
  );
  return result.rows;
}

async function getBorrowingById(id) {
  const result = await pool.query(
    `SELECT br.*, bk.title AS book_title, u.username AS user_name, a.admin_name AS admin_name
     FROM borrowings br
     LEFT JOIN books bk ON br.book_id = bk.book_id
     LEFT JOIN users u ON br.user_id = u.user_id
     LEFT JOIN admins a ON br.admin_id = a.admin_id
     WHERE br.borrow_id = $1`,
    [id]
  );
  return result.rows[0];
}

async function addBorrowing(data) {
  const { book_id, user_id, admin_id, borrow_date, return_date, status } = data;
  const result = await pool.query(
    `INSERT INTO borrowings (book_id, user_id, admin_id, borrow_date, return_date, status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      book_id,
      user_id,
      admin_id || null,
      borrow_date || new Date().toISOString().split("T")[0],
      return_date || null,
      status || "Menunggu Persetujuan",
    ]
  );
  return result.rows[0];
}

async function updateBorrowing(id, data) {
  // Build dynamic update query based on provided fields
  const fields = [];
  const values = [];
  let paramIndex = 1;

  // Only include fields that are provided in the data
  if (data.book_id !== undefined) {
    fields.push(`book_id = $${paramIndex++}`);
    values.push(data.book_id);
  }
  if (data.user_id !== undefined) {
    fields.push(`user_id = $${paramIndex++}`);
    values.push(data.user_id);
  }
  if (data.admin_id !== undefined) {
    fields.push(`admin_id = $${paramIndex++}`);
    values.push(data.admin_id);
  }
  if (data.borrow_date !== undefined) {
    fields.push(`borrow_date = $${paramIndex++}`);
    values.push(data.borrow_date);
  }
  if (data.return_date !== undefined) {
    fields.push(`return_date = $${paramIndex++}`);
    values.push(data.return_date);
  }
  if (data.status !== undefined) {
    fields.push(`status = $${paramIndex++}`);
    values.push(data.status);
  }

  // Add the WHERE parameter
  values.push(id);

  const result = await pool.query(
    `UPDATE borrowings
     SET ${fields.join(", ")}
     WHERE borrow_id = $${paramIndex}
     RETURNING *`,
    values
  );
  return result.rows[0];
}

async function deleteBorrowing(id) {
  const result = await pool.query(
    "DELETE FROM borrowings WHERE borrow_id = $1 RETURNING *",
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
  getAllBorrowings,
  getBorrowingById,
  addBorrowing,
  updateBorrowing,
  deleteBorrowing,
};
