import { Router } from "express";
import { getPublicContent } from "../controllers/publicController";

const router = Router();

router.get("/", getPublicContent);

export default router;
