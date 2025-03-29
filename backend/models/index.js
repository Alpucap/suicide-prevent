'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables

const basename = path.basename(__filename);
const User = require("./User.js");
const env = process.env.NODE_ENV || 'development';
const db = {};

// Konfigurasi koneksi ke PostgreSQL dari .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Matikan logging query jika tidak diperlukan
  }
);

// Baca semua file model dalam folder ini
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const modelImport = require(path.join(__dirname, file));
    const model = modelImport.default ? modelImport.default : modelImport;

    // Pastikan model memiliki fungsi init sebelum dipanggil
    if (typeof model.init === 'function') {
      model.init(sequelize, DataTypes);
    }

    db[model.name] = model;
  });

// Jalankan associate jika ada
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export objek db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
module.exports = { User };
