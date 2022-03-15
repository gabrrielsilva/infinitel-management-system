import { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import readline from 'readline';

import { Project } from '../model/Project';
import { projectData } from '../data/project-data';

const multerConfig = multer();
const spreadsheetRouter = Router();

spreadsheetRouter.post(
  '/projetos/csv-upload',
  multerConfig.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { file } = req;
      const { buffer } = file as Express.Multer.File;

      const readableFile = new Readable({
        read() {
          this.push(buffer);
          this.push(null); //end data
        },
      });
      // readableFile.push(buffer);
      // readableFile.push(null);

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
          executivo: undefined,
          prefeitura: undefined,
          energia: undefined,
          rodovia: undefined,
          outra: undefined,
          observacoes: undefined,
        });
      }

      await projectData.saveProjects(projects);

      return res.json(projects);
    } catch (e) {
      next(e);
    }
  },
);

export { spreadsheetRouter };
