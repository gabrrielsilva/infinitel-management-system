import { Executivo } from '@prisma/client';
import { executiveData } from '../data/project-executive-data';
import { Executive } from '../model/Executive';
import { projectService } from './project-service';

class ExecutiveService {
  getExecutiveProjects(): Promise<Executivo[] | null> {
    const executiveProjects = executiveData.getExecutiveProjects();

    return executiveProjects;
  }

  async getExecutiveProject(id: number): Promise<Executivo | null> {
    const executiveProject = await executiveData.getExecutiveProject(id);
    if (!executiveProject) throw new Error('Projeto executivo não encontrado');
    return executiveProject;
  }

  async saveExecutiveProject(executiveProject: Executive): Promise<void> {
    await projectService.getProject(executiveProject.projeto_id);

    const existingExecutiveProject = await executiveData.getExecutiveProject(
      executiveProject.projeto_id,
    );

    if (existingExecutiveProject) {
      throw new Error('Projeto executivo já existe');
    }

    return executiveData.saveExecutiveProject(executiveProject);
  }

  async updateExecutiveProject(executiveProject: Executive): Promise<void> {
    const existingProject = await executiveService.getExecutiveProject(
      executiveProject.projeto_id,
    );

    if (!existingProject) {
      throw new Error('Projeto executivo não encontrado');
    }

    return executiveData.updateExecutiveProject(executiveProject);
  }

  deleteExecutiveProject(id: number) {
    return executiveData.deleteExecutiveProject(id);
  }
}

export const executiveService = new ExecutiveService();
