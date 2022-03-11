import { Router, Request, Response } from 'express';
const router = Router();

import multer from 'multer';
const multerConfig = multer();

import { Readable } from 'stream';
import readline from 'readline';

import { client } from './db/client';

interface Project {
  id_sgi: number;
  nome_projeto: string;
  tipo_projeto: string;
  estado: string;
  cidade: string;
  status_sgi: string;
}

router.post(
  '/projects',
  multerConfig.single('file'),
  async (req: Request, res: Response) => {
    const { file } = req;
    const { buffer } = file as Express.Multer.File;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const projectsLine = readline.createInterface({
      input: readableFile,
    });

    const projects: Project[] = [];

    for await (let line of projectsLine) {
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

    // insert in db
    for await (let {
      id_sgi,
      nome_projeto,
      tipo_projeto,
      estado,
      cidade,
      status_sgi,
    } of projects) {
      await client.gerencial.create({
        data: {
          id_sgi,
          nome_projeto,
          tipo_projeto,
          estado,
          cidade,
          status_sgi,
        },
      });
    }

    return res.json(projects);
  }
);

// router.post(
//   '/projects',
//   multerConfig.array('file', 7),
//   async (req: Request, res: Response) => {
//     const files = req.files as Express.Multer.File[];
//     const buffer = files.map((file) => {
//       return file.buffer;
//     });

//     const readableFile = new Readable();
//     readableFile.push(buffer.toString());
//     readableFile.push(null);

//     const worksheetLine = readline.createInterface({
//       input: readableFile,
//     });

//     for await (let line of worksheetLine) {
//       const worksheetLineSplit = line.split(';');
//       console.log(worksheetLineSplit[0]);
//     }

//     return res.end();
//   }
// );

export { router };
