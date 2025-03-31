import express from "express";
import ChildrenController from "../controllers/children.controller.js";
import { childrenValidator } from "../validators/children.validator.js";

const router = express.Router();

router.post("/", childrenValidator, ChildrenController.createChildren);
router.get("/", ChildrenController.getAll);
router.get("/:id", ChildrenController.getById);
router.patch("/:id", childrenValidator, ChildrenController.patch);
router.delete("/:id", ChildrenController.delete);
router.post("/enroll", ChildrenController.enroll);

export default router;