const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db.js");
const { errorHandler } = require("./middlewares/errorMiddleware.js");

// Load environment variables
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Tambahkan CORS untuk mengizinkan akses dari frontend

// Sinkronisasi database tanpa menghapus data
sequelize.sync({ force: false })
  .then(() => console.log("Database Synced!"))
  .catch((err) => console.error("Error syncing database:", err));

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const counselingRoutes = require("./routes/counselingRoutes");
const adminRoutes = require('./routes/adminRoutes');



// Gunakan routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/counselings", counselingRoutes);
app.use('/api/admin', adminRoutes);

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Middleware Error Handling
app.use(errorHandler);

