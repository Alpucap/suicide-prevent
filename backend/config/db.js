const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected!");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
  }
};

module.exports = { sequelize, connectDB };
