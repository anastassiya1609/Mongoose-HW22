import express from "express";
import GroupController from "../controllers/group.controller.js";

const router = express.Router();

router.post("/", GroupController.createGroup);
router.get("/", GroupController.getAll);
router.get("/:id", GroupController.getById);
router.patch("/:id", GroupController.patch);
router.delete("/:id", GroupController.delete);

export default router;