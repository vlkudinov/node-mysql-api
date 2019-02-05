import {pool, queries} from '../config/db';

export const list = async function() {
  try {
    const countries = await pool.query(queries.country.list);
    return await countries;
  } catch (err) {
    throw err;
  }
};

export const load = async function(id) {
  try {
    const [country] = await pool.query(queries.country.load, [id]);
    return await country;
  } catch (err) {
    throw err;
  }
};

export const create = async function(country) {
  const {name, capital, area, population, language, gdp, gini, hdi} = country;
  
  try {
    const {insertId} = await pool.query(queries.country.create, [name, capital, area, population, language, gdp, gini, hdi]);
    return insertId;
  } catch (err) {
    throw err;
  }
};

export const update = async function(body, id) {
  const {name, capital, area, population, language, gdp, gini, hdi} = body;
  
  try {
    return await pool.query(queries.country.update, [name, capital, area, population, language, gdp, gini, hdi, id]);
  } catch (err) {
    throw err;
  }
};

export const remove = async function(id) {
  try {
    return await pool.query(queries.country.remove, [id]);
  } catch (err) {
    throw err;
  }
};
