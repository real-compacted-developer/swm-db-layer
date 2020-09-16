import express from 'express';
import questionApi from './questionApi';

const router = express.Router();

router.use('/question', questionApi);

export default router;
