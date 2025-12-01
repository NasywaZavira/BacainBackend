const express = require("express");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
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

const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/health", async (req, res) => {
  try {
    const client = await pool.connect();
    client.release();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Users routes (scoped to /users to avoid collision with other paths)
router.get("/users/:id", validateId, getUserById);
router.get("/users", getAllUsers);
router.post("/users", addUser);
router.put("/users/:id", validateId, updateUser);
router.delete("/users/:id", validateId, deleteUser);

// Books routes
router.get("/books", getAllBooks);
router.get("/books/:id", validateId, getBooksById);
router.post("/books", addBooks);
router.delete("/books/:id", validateId, deleteBooks);
router.put("/books/:id", validateId, updateBooks);

// Admins routes
router.get("/admins", getAllAdmins);
router.get("/admins/:id", validateId, getAdminById);
router.post("/admins", addAdmin);
router.put("/admins/:id", validateId, updateAdmin);
router.delete("/admins/:id", validateId, deleteAdmin);

module.exports = router;
