import { Router } from "express";
import { getPrivateContent } from "../controllers/privateController";
import { authenticateToken } from "../middlewares/authMiddleware"; // Middleware for authenticating JWT

const router = Router();

router.get("/private", authenticateToken, getPrivateContent);

export default router;
