import express from "express";
import TeacherController from "../controllers/teacher.controller.js";

const router = express.Router();

router.post("/", TeacherController.createTeacher);
router.get("/", TeacherController.getAll);
router.get("/:id", TeacherController.getById);
router.patch("/:id", TeacherController.patch);
router.delete("/:id", TeacherController.delete);

export default router;