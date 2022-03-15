import { Projeto } from '.prisma/client';
import { projectData } from '../data/project-data';
import { Project } from '../model/Project';

class ProjectService {
  getProjects(): Promise<Projeto[] | null> {
    return projectData.getProjects();
  }

  async getProject(id: number): Promise<Projeto | null> {
    const project = await projectData.getProject(id);
    if (!project) throw new Error('Projeto não encontrado');
    return project;
  }

  async saveProject(project: Project): Promise<void> {
    const existingIdProject = await projectData.getProject(project.id_sgi);
    const existingNameProject = await projectData.getProjectByName(
      project.nome_projeto,
    );
    if (existingIdProject || existingNameProject) {
      throw new Error('Projeto já existe');
    }
    return projectData.saveProject(project);
  }

  async updateProject(project: Project): Promise<void> {
    await this.getProject(project.id_sgi);
    return projectData.updateProject(project);
  }

  deleteProject(id: number): Promise<void> {
    return projectData.deleteProject(id);
  }
}

export const projectService = new ProjectService();
