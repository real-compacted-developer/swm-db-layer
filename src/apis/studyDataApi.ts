import express from 'express';
import db from "../database";
import ERROR_CODE from "../constants/errorCode";
import {body} from 'express-validator';
import checkValidation from "../middlewares/validator";

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await db.StudyData.findAll();
  res.status(200).json({
    success: true,
    data
  });
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const data = await db.StudyData.findByPk(id);

  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_DATA_NOT_FOUND
    });
    return;
  }

  res.status(200).json({
    success: true,
    data
  });
});

const createStudyDataValidator = [
  body('week').isNumeric(),
  body('studyTitle').isString()
];
router.post('/', createStudyDataValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {week, studyTitle} = req.body;

  const currentStudyGroup = await db.StudyGroup.findByPk(studyTitle);
  if (!currentStudyGroup) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_GROUP_NOT_FOUND
    });
    return;
  }

  const data = await db.StudyData.create({
    week,
    studyTitle
  });

  res.status(201).send({
    success: true,
    data
  });
});

const updateStudyDataValidator = [
  body('week').isNumeric(),
  body('studyTitle').isString()
];
router.put('/:id', updateStudyDataValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const {week, studyTitle} = req.body;

  const currentStudyGroup = await db.StudyGroup.findByPk(studyTitle);
  if (!currentStudyGroup) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_GROUP_NOT_FOUND
    });
    return;
  }

  const data = await db.StudyData.findByPk(id);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_DATA_NOT_FOUND
    });
    return;
  }

  await data.update({
    week,
    studyTitle
  });

  res.status(200).send({
    success: true,
    data
  });
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;

  const data = await db.StudyData.findByPk(id);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_DATA_NOT_FOUND
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
