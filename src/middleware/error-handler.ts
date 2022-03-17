import { NextFunction, Request, Response } from 'express';

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const conflictMessages: string[] = [
    'Projeto já existe',
    'Projeto executivo já existe',
    'Projeto de prefeitura já existe',
    'Projeto de energia já existe',
    'Projeto de rodovia já existe',
    'Projeto de ferrovia já existe',
  ];

  const notFoundMessages: string[] = [
    'Projeto não encontrado',
    'Projeto executivo não encontrado',
    'Projeto de prefeitura não encontrado',
    'Projeto de energia não encontrado',
    'Projeto de rodovia não encontrado',
    'Projeto de ferrovia não encontrado',
    'Observação não encontrada',
  ];

  conflictMessages.forEach((msg) => {
    if (err.message === msg) {
      return res.status(409).send(err.message);
    }
  });

  notFoundMessages.forEach((msg) => {
    if (err.message === msg) {
      return res.status(404).send(err.message);
    }
  });

  res.status(500).send(err.message);
};
