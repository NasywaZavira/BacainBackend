const booksService = require("../services/bacainService");

// BOOKS CONTROLLER
async function getAllBooks(req, res) {
  try {
    const books = await booksService.getAllBooks();

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function getBooksById(req, res) {
  try {
    const books = await booksService.getBooksById(req.params.id);
    if (!books) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Books not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Event retrieved successfully",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function addBooks(req, res) {
  try {
    const newBooks = await booksService.addBooks(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Event created successfully",
      data: newBooks,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function updateBooks(req, res) {
  try {
    const updatedBooks = await booksService.updateBooks(
      req.params.id,
      req.body
    );
    if (!updatedBooks) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Event not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Event updated successfully",
      data: updatedBooks,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function deleteBooks(req, res) {
  try {
    const deletedBooks = await booksService.deleteBooks(req.params.id);
    if (!deletedBooks) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Event not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Event deleted successfully",
      data: deletedBooks,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}


// USERS CONTROLLER
const usersService = require("../services/bacainService");

async function getAllUsers(req, res) {
  try {
    const users = await usersService.getAllUsers();

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function addUser(req, res) {
  try {
    const { username, user_email, password, nohp } = req.body;
    const newUser = await usersService.addUser({ username, user_email, password, nohp });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { username, user_email, password, nohp } = req.body;
    const updatedUser = await usersService.updateUser(req.params.id, { username, user_email, password, nohp });
    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await usersService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

// ADMINS CONTROLLER
const adminsService = require("../services/bacainService");

async function getAllAdmins(req, res) {
  try {
    const admins = await adminsService.getAllAdmins();

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Admins retrieved successfully",
      data: admins,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function getAdminById(req, res) {
  try {
    const admin = await adminsService.getAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Admin not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Admin retrieved successfully",
      data: admin,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function addAdmin(req, res) {
  try {
    const newAdmin = await adminsService.addAdmin(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Admin created successfully",
      data: newAdmin,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function updateAdmin(req, res) {
  try {
    const updatedAdmin = await adminsService.updateAdmin(
      req.params.id,
      req.body
    );
    if (!updatedAdmin) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Admin not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function deleteAdmin(req, res) {
  try {
    const deletedAdmin = await adminsService.deleteAdmin(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Admin not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Admin deleted successfully",
      data: deletedAdmin,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
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
