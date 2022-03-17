import { Rodovia } from '@prisma/client';
import { highwayData } from '../data/project-highway-data';
import { Highway } from '../model/Highway';
import { projectService } from './project-service';

class HighwayService {
  getHighwayProjects(): Promise<Rodovia[] | null> {
    const highwayProjects = highwayData.getHighwayProjects();

    return highwayProjects;
  }

  async getHighwayProject(id: number): Promise<Rodovia | null> {
    const highwayProject = await highwayData.getHighwayProject(id);
    if (!highwayProject) throw new Error('Projeto de rodovia não encontrado');
    return highwayProject;
  }

  async saveHighwayProject(highwayProject: Highway): Promise<void> {
    await projectService.getProject(highwayProject.projeto_id);

    const existingHighwayProject = await highwayData.getHighwayProject(
      highwayProject.projeto_id,
    );

    if (existingHighwayProject) {
      throw new Error('Projeto de rodovia já existe');
    }

    return highwayData.saveHighwayProject(highwayProject);
  }

  async updateHighwayProject(highwayProject: Highway): Promise<void> {
    const existingProject = await highwayService.getHighwayProject(
      highwayProject.projeto_id,
    );

    if (!existingProject) {
      throw new Error('Projeto de rodovia não encontrado');
    }

    return highwayData.updateHighwayProject(highwayProject);
  }

  deleteHighwayProject(id: number) {
    return highwayData.deleteHighwayProject(id);
  }
}

export const highwayService = new HighwayService();
