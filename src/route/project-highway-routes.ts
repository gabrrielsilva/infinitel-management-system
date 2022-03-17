import { Router, Request, Response, NextFunction } from 'express';

import { Highway } from '../model/Highway';
import { highwayService } from '../service/project-highway-service';

const highwayRouter = Router();

highwayRouter.get(
  '/projetos-rodovia',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const highwayProjects = await highwayService.getHighwayProjects();

      return res.json(highwayProjects);
    } catch (e) {
      next(e);
    }
  },
);

highwayRouter.get(
  '/projetos-rodovia/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const highwayProject = await highwayService.getHighwayProject(
        Number(req.params.id),
      );

      return res.json(highwayProject);
    } catch (e) {
      next(e);
    }
  },
);

highwayRouter.post(
  '/projetos-rodovia',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const highwayProject: Highway = req.body;
      await highwayService.saveHighwayProject(highwayProject);

      return res.status(201).end();
    } catch (e) {
      next(e);
    }
  },
);

highwayRouter.put(
  '/projetos-rodovia/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const highwayProject: Highway = req.body;
      const projetoId = Number(req.params.id);
      await highwayService.updateHighwayProject({
        ...highwayProject,
        projeto_id: projetoId,
      });

      res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

highwayRouter.delete(
  '/projetos-rodovia/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await highwayService.deleteHighwayProject(Number(req.params.id));

      res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

export { highwayRouter };
