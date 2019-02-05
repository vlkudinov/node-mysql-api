import mysql from 'mysql';
import util from 'util';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  connectionLimit: 30,
  multipleStatements: true
});

pool.query = util.promisify(pool.query);

const queries = {
  user: {
    load : `SELECT * FROM users WHERE id = ?`,
    password: `SELECT * FROM users WHERE username = ?`
  },
  country: {
    list: `SELECT countries.*, countries_image.link FROM countries LEFT JOIN countries_image ON countries.id = countries_image.id_country`,
    load: `SELECT countries.*, countries_image.link FROM countries LEFT JOIN countries_image ON countries.id = countries_image.id_country WHERE countries.id = ?`,
    create: `INSERT INTO countries (name, capital, area, population, language, gdp, gini, hdi) VALUES (?, ?, ?, ?, ?, ? ,? ,? )`,
    update: `UPDATE countries SET name = ?, capital = ?, area = ?, population = ?, language = ?, gdp = ?, gini = ?, hdi = ? WHERE id = ?`,
    remove: `DELETE FROM countries WHERE id = ?`
  },
  image: {
    add: 'INSERT INTO countries_image (id_country, link) VALUES (?, ?);',
    update: 'UPDATE countries_image SET link = ? WHERE id_country = ?;'
  }
};

export {pool, queries};
