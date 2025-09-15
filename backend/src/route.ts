import { Router, Request, Response } from 'express';
import * as authController from "./controllers/auth.controller"
import { AuthRequest, protectRoute } from './middleware/auth.middleware';


const router = Router();

router.get("/health", (req: Request, res: Response) => {
    res.status(200).send("API is healthy");
});

router.post("/auth/signup", authController.signup)
router.post("/auth/login", authController.login)
router.post("/auth/logout", authController.logout)
router.put("/auth/update-profile", protectRoute, authController.updateProfile)

router.get("/check", protectRoute, (req: AuthRequest, res: Response) => res.status(200).json(req.user));




export default router;