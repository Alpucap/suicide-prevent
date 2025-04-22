'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const basename = path.basename(__filename);
const db = {};

// Inisialisasi koneksi ke database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: false, // Matikan SSL
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Baca semua file model di folder ini (kecuali index.js)
fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  ))
  .forEach(file => {
    const modelFactory = require(path.join(__dirname, file));
    const model = modelFactory(sequelize, DataTypes);
    db[model.name] = model;
  });

// Jalankan associate kalau ada relasi
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export semua
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
