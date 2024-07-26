import { Router } from "express";
import { login, register, changeUserRole } from "../controllers/auth.controllers.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/change-role", [verifyToken, isAdmin], changeUserRole);

export default router;