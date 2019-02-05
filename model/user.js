import {pool, queries} from '../config/db';
import encrypt from '../app/tools/encrypt';

export const load = async function(id, done) {
  try {
    const [user] = await pool.query(queries.user.load, [id]);
    done(null, user);
    
  } catch (e) {
    done(e);
  }
};

export const password = async (reg, username, password, done) => {
  try {
    
    const user = await pool.query(queries.user.password, [username]);
    
    return user[0].password !== encrypt(password)
      ? done(null, false, reg.flash('danger', 'Wrong password or login'))
      : done(null, user[0], reg.flash('success', `Welcome, ${user[0].username}`));
    
  } catch (e) {
    done(null, false, reg.flash('danger', 'User not found'));
  }
};