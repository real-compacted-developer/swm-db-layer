import express from 'express';
import db from "../database";
import ERROR_CODE from "../constants/errorCode";
import {body} from 'express-validator';
import checkValidation from "../middlewares/validator";

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await db.StudyMember.findAll();
  res.status(200).json({
    success: true,
    data
  });
});

router.get('/nickname/:nickname', async (req, res) => {
  const {nickname} = req.params;
  const data = await db.StudyMember.findOne({
    where: {
      nickname
    }
  });

  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_MEMBER_NOT_FOUND
    });
    return;
  }

  res.status(200).json({
    success: true,
    data
  });
});

router.get('/study/:title', async (req, res) => {
  const {title} = req.params;
  const data = await db.StudyMember.findOne({
    where: {
      studyTitle: title
    }
  });

  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_MEMBER_NOT_FOUND
    });
    return;
  }

  res.status(200).json({
    success: true,
    data
  });
});

const createStudyMemberValidator = [
  body('nickname').isString(),
  body('studyTitle').isString()
];
router.post('/', createStudyMemberValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {nickname, studyTitle} = req.body;

  const currentUser = await db.User.findByPk(nickname);
  if (!currentUser) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_MEMBER_NOT_FOUND
    });
    return;
  }

  const currentStudyGroup = await db.StudyGroup.findByPk(studyTitle);
  if (!currentStudyGroup) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_GROUP_NOT_FOUND
    });
    return;
  }

  const data = await db.StudyMember.create({
    nickname,
    studyTitle
  });

  res.status(201).send({
    success: true,
    data
  });
});

router.delete('/:nickname/:title', async (req, res) => {
  const {nickname, title} = req.params;

  const data = await db.StudyMember.findOne({
    where: {
      nickname,
      studyTitle: title
    }
  });
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_MEMBER_NOT_FOUND
    });
    return;
  }

  await data.destroy();

  res.status(200).json({
    success: true,
    data
  });
});

export default router;
