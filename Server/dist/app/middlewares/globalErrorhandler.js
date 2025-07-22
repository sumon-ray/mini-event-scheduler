"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errorSources = err.errorSources || [
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
exports.default = globalErrorHandler;
