import { Router, Request, Response } from 'express';
import * as authController from "./controllers/auth.controller"


const router = Router();

router.get("/health", (req: Request, res: Response) => {
    res.status(200).send("API is healthy");
});


router.post("/auth/signup", authController.signup)
export default router;