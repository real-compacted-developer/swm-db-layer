import express from 'express';
import db from "../database";
import ERROR_CODE from "../constants/errorCode";
import {body} from 'express-validator';
import checkValidation from "../middlewares/validator";

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await db.Slide.findAll();
  res.status(200).json({
    success: true,
    data
  });
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const data = await db.Slide.findByPk(id);

  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.SLIDE_NOT_FOUND
    });
    return;
  }

  res.status(200).json({
    success: true,
    data
  });
});

const createSlideValidator = [
  body('order').isNumeric(),
  body('url').isString(),
  body('dataId').isNumeric()
];
router.post('/', createSlideValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {order, url, dataId} = req.body;

  const data = await db.Slide.create({
    order,
    url,
    dataId
  });

  res.status(201).send({
    success: true,
    data
  });
});

const updateSlideValidator = [
  body('order').isNumeric(),
  body('url').isString(),
  body('dataId').isNumeric()
];
router.put('/:id', updateSlideValidator, checkValidation, async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const {order, url, dataId} = req.body;

  const data = await db.Slide.findByPk(id);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.SLIDE_NOT_FOUND
    });
    return;
  }

  await data.update({
    order,
    url,
    dataId
  });

  res.status(200).send({
    success: true,
    data
  });
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;

  const data = await db.Slide.findByPk(id);
  if (!data) {
    res.status(404).json({
      success: false,
      message: ERROR_CODE.SLIDE_NOT_FOUND
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
