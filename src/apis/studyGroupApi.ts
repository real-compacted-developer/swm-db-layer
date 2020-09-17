import express from 'express';
import db from "../database";
import ERROR_CODE from "../constants/errorCode";
import {body} from 'express-validator';
import checkValidation from "../middlewares/validator";

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await db.StudyGroup.findAll();
  res.status(200).json({
    success: true,
    data
  });
});

router.get('/:title', async (req, res) => {
  const {title} = req.params;
  const data = await db.StudyGroup.findByPk(title);

  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_GROUP_NOT_FOUND
    });
    return;
  }

  res.status(200).json({
    success: true,
    data
  });
});

const createStudyGroupValidator = [
  body('title').isString(),
  body('category').isString(),
  body('password').isString(),
  body('salt').isString(),
  body('limitCount').isNumeric(),
  body('isPremium').isBoolean()
];
router.post('/', createStudyGroupValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {title, category, password, salt, limitCount, isPremium} = req.body;

  const current = await db.StudyGroup.findByPk(title);
  if (current) {
    res.status(409).json({
      success: false,
      message: ERROR_CODE.STUDY_GROUP_ALREADY_EXISTS
    });
    return;
  }

  const data = await db.StudyGroup.create({
    title,
    category,
    password,
    salt,
    limitCount,
    isPremium,
    people: 0
  });

  res.status(201).send({
    success: true,
    data
  });
});

const updateStudyGroupValidator = [
  body('people').isNumeric(),
  ...createStudyGroupValidator.slice(1)
];
router.put('/:title', updateStudyGroupValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {title} = req.params;
  const {category, password, salt, limitCount, isPremium, people} = req.body;

  const data = await db.StudyGroup.findByPk(title);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_GROUP_NOT_FOUND
    });
    return;
  }

  await data.update({
    category,
    password,
    salt,
    limitCount,
    isPremium,
    people
  });

  res.status(200).send({
    success: true,
    data
  });
});

router.delete('/:title', async (req, res) => {
  const {title} = req.params;

  const data = await db.StudyGroup.findByPk(title);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.STUDY_GROUP_NOT_FOUND
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
