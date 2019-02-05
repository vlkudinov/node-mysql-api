import express from 'express';
import * as country from '../controllers/country';

const router = express.Router();

router.get('/countries', country.list);
router.post('/countries', country.create);
router.get('/countries/:id', country.load);
router.patch('/countries/:id', country.update);
router.put('/countries/:id', country.update);
router.delete('/countries/:id', country.remove);

export default router;
