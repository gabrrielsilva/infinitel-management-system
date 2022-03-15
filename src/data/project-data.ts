import { Projeto } from '.prisma/client';
import { client } from '../../db/client';
import { Project } from '../model/Project';

class ProjectData {
  getProjects(): Promise<Projeto[] | null> {
    return client.projeto.findMany();
  }

  getProject(id: number): Promise<Projeto | null> {
    const projectSurvey = client.projeto.findUnique({
      where: {
        id_sgi: id,
      },
    });

    return projectSurvey;
  }

  getProjectByName(name: string): Promise<Projeto | null> {
    const projectSurveyByName = client.projeto.findUnique({
      where: {
        nome_projeto: name,
      },
    });

    return projectSurveyByName;
  }

  async saveProject(project: Project): Promise<void> {
    await client.projeto.create({
      data: {
        id_sgi: project.id_sgi,
        nome_projeto: project.nome_projeto,
        tipo_projeto: project.tipo_projeto,
        estado: project.estado,
        cidade: project.cidade,
        status_sgi: project.status_sgi,
      },
    });
  }

  // save spreadsheet with all projects in database
  async saveProjects(projects: Project[]): Promise<void> {
    for await (const {
      id_sgi,
      nome_projeto,
      tipo_projeto,
      estado,
      cidade,
      status_sgi,
    } of projects) {
      await client.projeto.create({
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
  }

  async updateProject(project: Project): Promise<void> {
    await client.projeto.update({
      data: {
        id_sgi: project.id_sgi,
        nome_projeto: project.nome_projeto,
        tipo_projeto: project.tipo_projeto,
        estado: project.estado,
        cidade: project.cidade,
        status_sgi: project.status_sgi,
      },
      where: {
        id_sgi: project.id_sgi,
      },
    });
  }

  async deleteProject(id: number): Promise<void> {
    await client.projeto.delete({
      where: {
        id_sgi: id,
      },
    });
  }

  async findMaxId() {
    const maxId: Array<{ max: number }> =
      await client.$queryRaw`SELECT MAX(id_sgi) FROM projeto`;
    return maxId;
  }
}

export const projectData = new ProjectData();
