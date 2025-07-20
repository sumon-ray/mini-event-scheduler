import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { TErrorSources } from '../globalTypes/error.type';

const globalErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errorSources: TErrorSources = err.errorSources || [
    {
      path: '',
      message: message,
    },
  ];

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSources,
    // err: err,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
