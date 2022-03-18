import { Router, Request, Response, NextFunction } from 'express';
import { Energy } from '../model/Energy';
import { energyService } from '../service/project-energy-service';

const energyRouter = Router();

energyRouter.get(
  '/projetos-energia',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const energyProjects = await energyService.getEnergyProjects();

      return res.json(energyProjects);
    } catch (e) {
      next(e);
    }
  },
);

energyRouter.get(
  '/projetos-energia/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const energyProject = await energyService.getEnergyProject(
        Number(req.params.id),
      );

      return res.json(energyProject);
    } catch (e) {
      next(e);
    }
  },
);

energyRouter.post(
  '/projetos-energia',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const energyProject: Energy = req.body;
      await energyService.saveEnergyProject(energyProject);

      return res.status(201).end();
    } catch (e) {
      next(e);
    }
  },
);

energyRouter.put(
  '/projetos-energia/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const energyProject: Energy = req.body;
      const projetoId = Number(req.params.id);
      await energyService.updateEnergyProject({
        ...energyProject,
        projeto_id: projetoId,
      });

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

energyRouter.delete(
  '/projetos-energia/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await energyService.deleteEnergyProject(Number(req.params.id));

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

export { energyRouter };
