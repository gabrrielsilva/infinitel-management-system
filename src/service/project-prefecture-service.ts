import { Prefeitura } from '@prisma/client';
import { prefectureData } from '../data/project-prefecture-data';
import { Prefecture } from '../model/Prefecture';
import { projectService } from './project-service';

class PrefectureService {
  getPrefectureProjects(): Promise<Prefeitura[] | null> {
    const prefectureProjects = prefectureData.getPrefectureProjects();

    return prefectureProjects;
  }

  async getPrefectureProject(id: number): Promise<Prefeitura | null> {
    const prefectureProject = await prefectureData.getPrefectureProject(id);
    if (!prefectureProject)
      throw new Error('Projeto de prefeitura não encontrado');
    return prefectureProject;
  }

  async savePrefectureProject(prefectureProject: Prefecture): Promise<void> {
    await projectService.getProject(prefectureProject.projeto_id);

    const existingPrefectureProject = await prefectureData.getPrefectureProject(
      prefectureProject.projeto_id,
    );

    if (existingPrefectureProject) {
      throw new Error('Projeto de prefeitura já existe');
    }

    return prefectureData.savePrefectureProject(prefectureProject);
  }

  async updatePrefectureProject(prefectureProject: Prefecture): Promise<void> {
    const existingProject = await prefectureService.getPrefectureProject(
      prefectureProject.projeto_id,
    );

    if (!existingProject) {
      throw new Error('Projeto de prefeitura não encontrado');
    }

    return prefectureData.updatePrefectureProject(prefectureProject);
  }

  deletePrefectureProject(id: number) {
    return prefectureData.deletePrefectureProject(id);
  }
}

export const prefectureService = new PrefectureService();
