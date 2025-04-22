exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500; // Ambil status code dari error atau default 500
  res.status(statusCode).json({
    success: false,
    message: err.message || "Terjadi kesalahan server",
  });
};
