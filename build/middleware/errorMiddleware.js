"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Error handling middleware
const errorMiddleware = (error, req, res, next) => {
    if (error) {
        return res.status(error.statusCode || 500).send(error.message || 'Internal Server Error');
    }
    else {
        return res.status(500).send('unexpected error');
    }
};
exports.default = errorMiddleware;
