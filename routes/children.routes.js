import express from "express";
import ChildrenController from "../controllers/children.controller.js";

const router = express.Router();

router.post("/", ChildrenController.createChildren);
router.get("/", ChildrenController.getAll);
router.get("/:id", ChildrenController.getById);
router.patch("/:id", ChildrenController.patch);
router.delete("/:id", ChildrenController.delete);
router.post("/enroll", ChildrenController.enroll);

export default router;