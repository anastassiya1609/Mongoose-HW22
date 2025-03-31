import express from "express";
import TeacherController from "../controllers/teacher.controller.js";
import { teacherValidator } from "../validators/teacher.validators.js";

const router = express.Router();

router.post("/", teacherValidator,  TeacherController.createTeacher);
router.get("/", TeacherController.getAll);
router.get("/:id", TeacherController.getById);
router.patch("/:id", teacherValidator, TeacherController.patch);
router.delete("/:id", TeacherController.delete);

export default router;