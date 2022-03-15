import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Conflict
  if (err.message === 'Projeto já existe') {
    return res.status(409).send(err.message);
  }
  if (err.message === 'Projeto executivo já existe') {
    return res.status(409).send(err.message);
  }

  // Not Found
  if (err.message === 'Projeto não encontrado') {
    return res.status(404).send(err.message);
  }
  if (err.message === 'Projeto executivo não encontrado') {
    return res.status(404).send(err.message);
  }
  if (
    err.message ===
    'Projeto não existe, não é possível defini-lo como executivo'
  ) {
    return res.status(404).send(err.message);
  }

  res.status(500).send(err.message);
};
