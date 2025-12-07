const express = require("express");
const pool = require("../config/db");
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
  getAllBorrowings,
  getBorrowingById,
  addBorrowing,
  updateBorrowing,
  deleteBorrowing,
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

// Users routes 
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

// Borrowings routes
router.get("/borrowings", getAllBorrowings);
router.get("/borrowings/:id", validateId, getBorrowingById);
router.post("/borrowings", addBorrowing);
router.put("/borrowings/:id", validateId, updateBorrowing);
router.delete("/borrowings/:id", validateId, deleteBorrowing);

module.exports = router;
