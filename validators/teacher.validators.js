import { body } from "express-validator";
import { createCustomValidatorMiddleware } from "../middleware/validator.middleware.js";

export const teacherValidator = createCustomValidatorMiddleware([
  body("fullName")
    .exists()
    .withMessage("Поле fullName обязательно")
    .isString()
    .withMessage("Поле fullName должно быть строкой")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Поле fullName должно содержать минимум 3 символа"),

  body("education")
    .exists()
    .withMessage("Поле education обязательно")
    .isString()
    .withMessage("Поле education должно быть строкой")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Поле education должно содержать минимум 3 символа"),
]);
