import express from 'express';
import * as country from '../controllers/country';
import * as user from '../controllers/user';
import requiresLogin from '../middlewares/requiresLogin';

const router = express.Router();

router.get('/', user.login);
router.post('/login', user.authenticate);
router.delete('/logout', requiresLogin, user.logout);
router.get('/countries', requiresLogin, country.list);
router.post('/countries', requiresLogin, country.create);
router.get('/countries/:id', requiresLogin, country.load);
router.patch('/countries/:id', requiresLogin, country.update);
router.put('/countries/:id', requiresLogin, country.update);
router.delete('/countries/:id', requiresLogin, country.remove);


export default router;
