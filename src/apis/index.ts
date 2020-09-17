import express from 'express';
import questionApi from './questionApi';
import slideApi from './slideApi';
import studyDataApi from './studyDataApi';
import studyGroupApi from './studyGroupApi';
import studyMemberApi from './studyMemberApi';

const router = express.Router();

router.use('/question', questionApi);
router.use('/slide', slideApi);
router.use('/studydata', studyDataApi);
router.use('/studygroup', studyGroupApi);
router.use('/studymember', studyMemberApi);

export default router;
