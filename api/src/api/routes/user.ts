import { Router, Request, Response } from 'express';

const userRouter = Router();
export const initUserRoutes = (app: Router): void => {
  app.use(`/users`, userRouter);

  userRouter.get(`/me`, (req: Request, res: Response) => res.json({ user: `me` }).status(200));
};
