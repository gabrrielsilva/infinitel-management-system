import { Router, Request, Response, NextFunction } from 'express';

import { Project } from '../model/Project';
import { projectService } from '../service/project-service';
import { projectData } from '../data/project-data';

const projectRouter = Router();

projectRouter.get(
  '/projetos',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await projectService.getProjects();
      return res.json(projects);
    } catch (e) {
      next(e); // -> error handler middleware
    }
  },
);

projectRouter.get(
  '/projetos/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.getProject(Number(req.params.id));
      return res.json(project);
    } catch (e) {
      next(e);
    }
  },
);

projectRouter.post(
  '/projetos',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project: Project = req.body;

      // In findMaxId() the 'queryRaw' of Prisma return: [{max: x}]
      const maxIdFound = await projectData.findMaxId();
      const maxIdFormat = maxIdFound[0].max;

      await projectService.saveProject({
        ...project,
        id_sgi: project.id_sgi ?? maxIdFormat + 1,
      });

      return res.status(201).end();
    } catch (e) {
      next(e);
    }
  },
);

projectRouter.put(
  '/projetos/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project: Project = req.body;

      await projectService.updateProject({
        ...project,
        id_sgi: Number(req.params.id),
      });

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

projectRouter.delete(
  '/projetos/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await projectService.deleteProject(Number(req.params.id));
      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

export { projectRouter };
