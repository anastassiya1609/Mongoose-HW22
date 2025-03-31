import { body } from "express-validator";
import mongoose from "mongoose";
import { createCustomValidatorMiddleware } from "../middleware/validator.middleware.js";

export const groupValidator = createCustomValidatorMiddleware([
    body("name")
      .exists().withMessage("Поле name обязательно")
      .isString().withMessage("Поле name должно быть строкой")
      .trim()
      .isLength({ min: 2 }).withMessage("Поле name должно содержать минимум 2 символа"),
  
    body("childrens")
      .optional()
      .isArray().withMessage("Поле childrens должно быть массивом")
      .custom((value) => value.every(mongoose.Types.ObjectId.isValid))
      .withMessage("Каждый элемент массива childrens должен быть ObjectId"),
  
    body("teacher")
      .optional()
      .custom(mongoose.Types.ObjectId.isValid)
      .withMessage("Поле teacher должно быть ObjectId"),
  ]) 
