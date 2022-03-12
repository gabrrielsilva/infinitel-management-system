import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import readline from 'readline';

import { Project } from '../model/Project';
import { projectService } from '../service/project-service';
import { projectData } from '../data/project-data';

const router = Router();
const multerConfig = multer();

router.get(
  '/projects',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await projectService.getProjects();
      return res.json(projects);
    } catch (e) {
      next(e); // -> error handler middleware
    }
  },
);

router.get(
  '/projects/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.getProject(Number(req.params.id));
      return res.json(project);
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/project',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project: Project = req.body;
      const maxId = await projectData.findMaxId();

      await projectService.saveProject({
        ...project,
        id_sgi: project.id_sgi ?? maxId[0].max + 1,
      });

      return res.status(201).end();
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/projects',
  multerConfig.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { file } = req;
      const { buffer } = file as Express.Multer.File;

      const readableFile = new Readable();
      readableFile.push(buffer);
      readableFile.push(null);

      const projectsLine = readline.createInterface({
        input: readableFile,
      });

      const projects: Project[] = [];

      for await (const line of projectsLine) {
        const projectsLineSplit = line.split(';');
        projects.push({
          id_sgi: Number(projectsLineSplit[0]),
          nome_projeto: projectsLineSplit[1],
          tipo_projeto: projectsLineSplit[2],
          estado: projectsLineSplit[3],
          cidade: projectsLineSplit[4],
          status_sgi: projectsLineSplit[5],
        });
      }

      await projectData.saveProjects(projects);

      return res.json(projects);
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/projects/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project: Project = req.body;

      await projectService.updateProject({
        ...project,
        id_sgi: Number(req.params.id),
      });

      res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

router.delete(
  '/projects/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await projectService.deleteProject(Number(req.params.id));
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

export { router };
