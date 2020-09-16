import express from 'express';
import db from "../database";
import ERROR_CODE from "../constants/errorCode";
import { body, param } from 'express-validator';
import checkValidation from "../middlewares/validator";

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await db.Question.findAll();
  res.status(200).json({
    success: true,
    data
  });
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const data = await db.Question.findByPk(id);

  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.QUESTION_NOT_FOUND
    });
    return;
  }

  res.status(200).json({
    success: true,
    data
  });
});

const createQuestionValidator = [
  body('title').isString(),
  body('content').isString(),
  body('writer').isString(),
  body('SlideId').isNumeric()
];
router.post('/', createQuestionValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {title, content, writer, SlideId} = req.body;

  const data = await db.Question.create({
    title,
    content,
    writer,
    SlideId,
    like: 0
  });

  res.status(201).send({
    success: true,
    data
  });
});

const updateQuestionValidator = [
  body('title').isString(),
  body('content').isString()
];
router.put('/:id', updateQuestionValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const {title, content} = req.body;

  const data = await db.Question.findByPk(id);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.QUESTION_NOT_FOUND
    });
    return;
  }

  await data.update({
    title,
    content
  });

  res.status(200).send({
    success: true,
    data
  });
});

router.post('/like/up/:id', async (req, res) => {
  const {id} = req.params;

  const data = await db.Question.findByPk(id);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.QUESTION_NOT_FOUND
    });
    return;
  }

  const currentLike = data.like;

  await data.update({
    like: currentLike + 1
  });

  res.status(200).send({
    success: true,
    data
  });
});

router.post('/like/down/:id', async (req, res) => {
  const {id} = req.params;

  const data = await db.Question.findByPk(id);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.QUESTION_NOT_FOUND
    });
    return;
  }

  const currentLike = data.like;

  if (currentLike <= 0) {
    res.status(400).json({
      success: false,
      message: ERROR_CODE.QUESTION_LIKE_NOT_MINUS
    });
    return;
  }

  await data.update({
    like: currentLike - 1
  });

  res.status(200).send({
    success: true,
    data
  });
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;

  const data = await db.Question.findByPk(id);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.QUESTION_NOT_FOUND
    });
    return;
  }

  await data.destroy();
});

export default router;
