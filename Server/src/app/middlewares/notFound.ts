import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, _next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "API not found",
    errorSources: [
      {
        path: req.originalUrl,
        message: "Your requested path is not found",
      },
    ],
  });
};

export default notFound;
