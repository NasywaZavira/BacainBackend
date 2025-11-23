const express = require("express");
const {
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
} = require("../controllers/bacainControllers");

const router = express.Router();

// Users routes (scoped to /users to avoid collision with other paths)
router.get("/users/:id", getUserById);
router.get("/users", getAllUsers);

// Books routes
router.get("/books", getAllBooks);
router.get("/books/:id", getBooksById);
router.delete("/books/:id", deleteBooks);
router.put("/books/:id", updateBooks);

module.exports = router;
