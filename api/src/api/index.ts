import { Router } from 'express';
import { initUserRoutes } from './routes/user';

export const initRoutes = (): Router => {
  const router = Router();
  initUserRoutes(router);
  return router;
};
