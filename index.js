const express = require("express");
const app = express();
const port = 3030;

app.use(express.json());

let books = [
  {
    bookId: 1,
    title: "Frankenstein",
    author: "Mary Shelly",
    blurb:
      "Obsessed with creating life itself, Victor Frankenstein plunders graveyards for the material to fashion a new being, which he shocks into life with electricity. But his botched creature, rejected by Frankenstein and denied human companionship, sets out to destroy his maker and all that he holds dear. Mary Shelley's chilling Gothic tale was conceived when she was only eighteen, living with her lover Percy Shelley near Byron's villa on Lake Geneva. It would become the world's most famous work of horror fiction, and remains a devastating exploration of the limits of human creativity.",
    genre: "sci-fi",
    status: "available",
  },
];

let users = [
  {
    userId: 1,
    name: "Nulla",
    email: "nulla@gmail.com",
    password: "user1234",
    nohp: "081263774668",
  },
];

let admins = [
  {
    adminId: 1,
    adminName: "Admimin",
    adminEmail: "admimin@gmail.com",
    password: "admin1234",
  },
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// SELECT DATA (GET)
app.get("/books/:id", (req, res) => {
  let id = parseInt(req.params.id);
  //find book
  let book = books.find((b) => b.bookId == id);

  res.json(book);
});

// ADD DATA (POST)
app.post("/books", (req, res) => {
  let newTitle = req.body.title;
  let newAuthor = req.body.author;
  let newBookId = books.length + 1;

  let newBook = {
    bookId: newBookId,
    title: newTitle,
    author: newAuthor,
  };

  books.push(newBook);
  res.status(201).json(books); //data berhasil dibuat
});

// ADD NEW USER (POST)
app.post("/users", (req, res) => {
  let newName = req.body.name;
  let newEmail = req.body.email;
  let newPassword = req.body.password;
  let newNohp = req.body.nohp;
  let newUserId = user.length + 1;

  let newUser = {
    userId: newUserId,
    name: newName,
    email: newEmail,
    password: newPassword,
    nohp: newNohp,
  };

  user.push(newUser);
  res.status(201).json(user);
});

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundUser = user.find((u) => u.userId == id);
  res.json(foundUser);
});

// GET all admins
app.get("/admins", (req, res) => {
  res.json(admin);
});

// GET admin by ID
app.get("/admins/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundAdmin = admin.find((a) => a.adminId == id);
  res.json(foundAdmin);
});

// ADD NEW ADMIN (POST) - bonus if you need it
app.post("/admins", (req, res) => {
  let newAdminName = req.body.adminName;
  let newAdminEmail = req.body.adminEmail;
  let newPassword = req.body.password;
  let newAdminId = admin.length + 1;

  let newAdmin = {
    adminId: newAdminId,
    adminName: newAdminName,
    adminEmail: newAdminEmail,
    password: newPassword,
  };

  admin.push(newAdmin);
  res.status(201).json(admins);
});

// app.listen(port, callback)
// callback -> fungsi yang dijalankan setelah proses lain selesai
app.listen(port, () => {
  console.log("SERVER HIDUP");
});
