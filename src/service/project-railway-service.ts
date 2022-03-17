import { Ferrovia } from '@prisma/client';
import { railwayData } from '../data/project-railway-data';
import { Railway } from '../model/Railway';
import { projectService } from './project-service';

class RailwayService {
  getRailwayProjects(): Promise<Ferrovia[] | null> {
    const railwayProjects = railwayData.getRailwayProjects();

    return railwayProjects;
  }

  async getRailwayProject(id: number): Promise<Ferrovia | null> {
    const railwayProject = await railwayData.getRailwayProject(id);
    if (!railwayProject) throw new Error('Projeto de ferrovia não encontrado');
    return railwayProject;
  }

  async saveRailwayProject(railwayProject: Railway): Promise<void> {
    await projectService.getProject(railwayProject.projeto_id);

    const existingRailwayProject = await railwayData.getRailwayProject(
      railwayProject.projeto_id,
    );

    if (existingRailwayProject) {
      throw new Error('Projeto de ferrovia já existe');
    }

    return railwayData.saveRailwayProject(railwayProject);
  }

  async updateRailwayProject(railwayProject: Railway): Promise<void> {
    const existingProject = await railwayService.getRailwayProject(
      railwayProject.projeto_id,
    );

    if (!existingProject) {
      throw new Error('Projeto de ferrovia não encontrado');
    }

    return railwayData.updateRailwayProject(railwayProject);
  }

  deleteRailwayProject(id: number) {
    return railwayData.deleteRailwayProject(id);
  }
}

export const railwayService = new RailwayService();
