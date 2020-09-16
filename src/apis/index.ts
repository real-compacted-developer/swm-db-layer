import express from 'express';
import questionApi from './questionApi';
import slideApi from './slideApi';

const router = express.Router();

router.use('/question', questionApi);
router.use('/slide', slideApi);

export default router;
