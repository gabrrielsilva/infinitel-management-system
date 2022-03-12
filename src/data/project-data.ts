import { Gerencial } from '.prisma/client';
import { client } from '../../db/client';
import { Project } from '../model/Project';

class ProjectData {
  getProjects(): Promise<Gerencial[] | null> {
    return client.gerencial.findMany();
  }

  getProject(id: number): Promise<Gerencial | null> {
    const projectSurvey = client.gerencial.findUnique({
      where: {
        id_sgi: id,
      },
    });

    return projectSurvey;
  }

  getProjectByName(name: string): Promise<Gerencial | null> {
    const projectSurveyByName = client.gerencial.findUnique({
      where: {
        nome_projeto: name,
      },
    });

    return projectSurveyByName;
  }

  async saveProject(project: Project): Promise<void> {
    await client.gerencial.create({
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

  // save worksheet with all projects in database
  async saveProjects(projects: Project[]): Promise<void> {
    for await (const {
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
  }

  async updateProject(project: Project): Promise<void> {
    await client.gerencial.update({
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
    await client.gerencial.delete({
      where: {
        id_sgi: id,
      },
    });
  }

  async findMaxId() {
    const maxId: Array<{ max: number }> =
      await client.$queryRaw`SELECT MAX(id_sgi) FROM gerencial`;
    return maxId;
  }
}

export const projectData = new ProjectData();
