import express from "express";
import GroupController from "../controllers/group.controller.js";
import { groupValidator } from "../validators/group.validator.js";

const router = express.Router();

router.post("/", groupValidator, GroupController.createGroup);
router.get("/", GroupController.getAll);
router.get("/:id", GroupController.getById);
router.patch("/:id", groupValidator, GroupController.patch);
router.delete("/:id", GroupController.delete);

export default router;