import { ErrorRequestHandler } from "express";

export const errorHandle: ErrorRequestHandler = (err, _, res, __) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
};
