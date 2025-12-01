module.exports = function validateId(req, res, next) {
  const { id } = req.params;
  if (id === undefined) return next();
  // Accept only positive integers
  if (!/^\d+$/.test(String(id))) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Invalid id parameter — must be an integer",
    });
  }
  next();
};
