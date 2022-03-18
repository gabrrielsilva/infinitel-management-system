import { Router, Request, Response, NextFunction } from 'express';
import { Prefecture } from '../model/Prefecture';
import { prefectureService } from '../service/project-prefecture-service';

const prefectureRouter = Router();

prefectureRouter.get(
  '/projetos-prefeitura',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prefectureProjects =
        await prefectureService.getPrefectureProjects();

      return res.json(prefectureProjects);
    } catch (e) {
      next(e);
    }
  },
);

prefectureRouter.get(
  '/projetos-prefeitura/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prefectureProject = await prefectureService.getPrefectureProject(
        Number(req.params.id),
      );

      return res.json(prefectureProject);
    } catch (e) {
      next(e);
    }
  },
);

prefectureRouter.post(
  '/projetos-prefeitura',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prefectureProject: Prefecture = req.body;
      await prefectureService.savePrefectureProject(prefectureProject);

      return res.status(201).end();
    } catch (e) {
      next(e);
    }
  },
);

prefectureRouter.put(
  '/projetos-prefeitura/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prefectureProject: Prefecture = req.body;
      const projetoId = Number(req.params.id);
      await prefectureService.updatePrefectureProject({
        ...prefectureProject,
        projeto_id: projetoId,
      });

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

prefectureRouter.delete(
  '/projetos-prefeitura/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prefectureService.deletePrefectureProject(Number(req.params.id));

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

export { prefectureRouter };
