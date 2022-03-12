import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.message === 'Project already exists') {
    return res.status(409).send(err.message);
  }
  if (err.message === 'Project not found') {
    return res.status(404).send(err.message);
  }
  res.status(500).send(err.message);
};
