import expressLoader from './express';
import { Application } from 'express';
import { Logger } from './logger';

export interface LoaderParams {
  app: Application;
}

export const loader = async ({ app }: LoaderParams): Promise<void> => {
  await expressLoader(app);
  Logger.info(`✅ Express loaded`);
};
