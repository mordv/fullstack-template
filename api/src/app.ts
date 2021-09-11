import express from 'express';
import { AppConfig } from './config';
import { Logger } from './loaders/logger';
import { loader } from './loaders';

const startServer = async () => {
  const app = express();

  await loader({ app });

  app
    .listen(AppConfig.port, () => Logger.info(`✅ Server listening on port: ${AppConfig.port}`))
    .on(`error`, (err) => {
      Logger.error(err);
      process.exit(1);
    });
};
startServer().then();
