import express from 'express';
import db from "../database";
import ERROR_CODE from "../constants/errorCode";
import {body} from 'express-validator';
import checkValidation from "../middlewares/validator";
import {GenderArray} from "../types";

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await db.User.findAll();
  res.status(200).json({
    success: true,
    data
  });
});

router.get('/:nickname', async (req, res) => {
  const {nickname} = req.params;
  const data = await db.User.findByPk(nickname);

  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.USER_NOT_FOUND
    });
    return;
  }

  res.status(200).json({
    success: true,
    data
  });
});

const createUserValidator = [
  body('nickname').isString(),
  body('email').isString(),
  body('gender').isIn(Object.values(GenderArray)),
  body('age').isNumeric(),
  body('birthday').isNumeric(),
  body('isPremium').isBoolean()
];
router.post('/', createUserValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {nickname, email, gender, age, birthday, isPremium} = req.body;

  const current = await db.User.findByPk(nickname);
  if (current) {
    res.status(409).json({
      success: false,
      message: ERROR_CODE.USER_ALREADY_EXISTS
    });
    return;
  }

  const data = await db.User.create({
    nickname,
    email,
    gender,
    age,
    birthday: new Date(birthday * 1000),
    isPremium
  });

  res.status(201).send({
    success: true,
    data
  });
});

const updateUserValidator = createUserValidator.slice(1);
router.put('/:nickname', updateUserValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {nickname} = req.params;
  const {email, gender, age, birthday, isPremium} = req.body;

  const data = await db.User.findByPk(nickname);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.USER_NOT_FOUND
    });
    return;
  }

  await data.update({
    email,
    gender,
    age,
    birthday: new Date(birthday * 1000),
    isPremium
  });

  res.status(200).send({
    success: true,
    data
  });
});

router.delete('/:nickname', async (req, res) => {
  const {nickname} = req.params;

  const data = await db.User.findByPk(nickname);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.USER_NOT_FOUND
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
