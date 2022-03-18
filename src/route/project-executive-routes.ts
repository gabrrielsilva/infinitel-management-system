import { Router, Request, Response, NextFunction } from 'express';
import { Executive } from '../model/Executive';
import { executiveService } from '../service/project-executive-service';

const executiveRouter = Router();

executiveRouter.get(
  '/projetos-executivos',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const executiveProjects = await executiveService.getExecutiveProjects();

      return res.json(executiveProjects);
    } catch (e) {
      next(e);
    }
  },
);

executiveRouter.get(
  '/projetos-executivos/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const executiveProject = await executiveService.getExecutiveProject(
        Number(req.params.id),
      );

      return res.json(executiveProject);
    } catch (e) {
      next(e);
    }
  },
);

executiveRouter.post(
  '/projetos-executivos',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const executiveProject: Executive = req.body;
      await executiveService.saveExecutiveProject(executiveProject);

      return res.status(201).end();
    } catch (e) {
      next(e);
    }
  },
);

executiveRouter.put(
  '/projetos-executivos/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const executiveProject: Executive = req.body;
      const projetoId = Number(req.params.id);
      await executiveService.updateExecutiveProject({
        ...executiveProject,
        projeto_id: projetoId,
      });

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

executiveRouter.delete(
  '/projetos-executivos/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await executiveService.deleteExecutiveProject(Number(req.params.id));

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

export { executiveRouter };
