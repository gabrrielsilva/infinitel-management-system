import { Router, Request, Response, NextFunction } from 'express';
import { Railway } from '../model/Railway';
import { railwayService } from '../service/project-railway-service';

const railwayRouter = Router();

railwayRouter.get(
  '/projetos-ferrovia',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const railwayProjects = await railwayService.getRailwayProjects();

      return res.json(railwayProjects);
    } catch (e) {
      next(e);
    }
  },
);

railwayRouter.get(
  '/projetos-ferrovia/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const railwayProject = await railwayService.getRailwayProject(
        Number(req.params.id),
      );

      return res.json(railwayProject);
    } catch (e) {
      next(e);
    }
  },
);

railwayRouter.post(
  '/projetos-ferrovia',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const railwayProject: Railway = req.body;
      await railwayService.saveRailwayProject(railwayProject);

      return res.status(201).end();
    } catch (e) {
      next(e);
    }
  },
);

railwayRouter.put(
  '/projetos-ferrovia/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const railwayProject: Railway = req.body;
      const projetoId = Number(req.params.id);
      await railwayService.updateRailwayProject({
        ...railwayProject,
        projeto_id: projetoId,
      });

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

railwayRouter.delete(
  '/projetos-ferrovia/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await railwayService.deleteRailwayProject(Number(req.params.id));

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

export { railwayRouter };
