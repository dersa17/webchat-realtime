import { Router, Request, Response } from 'express';


const router = Router();

router.get("/health", (req: Request, res: Response) => {
    res.status(200).send("API is healthy");
});

export default router;