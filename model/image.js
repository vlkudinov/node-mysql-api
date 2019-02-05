import {pool, queries} from '../config/db';

export const add = async function(countryId, link) {
  try {
    return await pool.query(queries.image.add, [countryId, link]);
  } catch (err) {
    throw err;
  }
};

export const update = async function(countryId, link) {
  try {
    await pool.query(queries.image.update, [link, countryId]);
    return true;
  } catch (err) {
    throw err;
  }
};
