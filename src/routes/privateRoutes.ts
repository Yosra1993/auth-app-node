import { Router } from "express";
import { getPrivateContent } from "../controllers/privateController";
import { authenticateToken } from "../middlewares/authMiddleware"; // Middleware pour authentifier le JWT

const router = Router();

router.get("/private", authenticateToken, getPrivateContent);

export default router;
