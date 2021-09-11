import express, { Application, ErrorRequestHandler } from 'express';
import { AppConfig } from '../config';
import { HttpException } from '../api/errors/HttpException';
import { initRoutes } from '../api';

export default (app: Application): void => {
  app.get(`/status`, (req, res) => {
    res.status(200).end();
  });
  app.head(`/status`, (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable(`trust proxy`);

  // Transforms the raw string of req.body into json
  app.use(express.json());

  // Load API routes
  app.use(AppConfig.api.prefix, initRoutes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => next(new HttpException(404, `Not Found`)));

  /// error handlers
  app.use(((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === `UnauthorizedError` && err.status) {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  }) as ErrorRequestHandler);

  app.use(((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message || `unknown error`,
      },
    });
  }) as ErrorRequestHandler);
};
