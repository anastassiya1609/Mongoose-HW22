import { body } from "express-validator";
import { createCustomValidatorMiddleware } from "../middleware/validator.middleware.js";

export const childrenValidator = createCustomValidatorMiddleware([
  body("fullName")
    .exists()
    .withMessage("Поле fullName обязательно")
    .isString()
    .withMessage("Поле fullName должно быть строкой")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Минимальная длина 3 символа"),

  body("age")
    .exists()
    .withMessage("Поле age обязательно")
    .isInt({ min: 2, max: 7 })
    .withMessage("Возраст должен быть числом больше 2 и меньше 7"),

  body("vaccinations")
    .optional()
    .isArray()
    .withMessage("Поле vaccinations должно быть массивом"),

  body("vaccinations.*.vaccineName")
    .optional()
    .isString()
    .withMessage("Поле vaccineName должно быть строкой")
    .trim(),

  body("vaccinations.*.vaccinationYear")
    .optional()
    .isInt({ min: 2017, max: new Date().getFullYear() })
    .withMessage("Некорректный год вакцинации"),
]);
