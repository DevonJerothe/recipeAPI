import { Router } from "express";
const router = Router();
const controller = require("../controllers/recipesController");

router.get("/random", controller.getRandom);
router.get("/", )

export default router;
