import { Energia } from '@prisma/client';
import { Energy } from '../model/Energy';
import { energyData } from '../data/project-energy-data';
import { projectService } from './project-service';

class EnergyService {
  getEnergyProjects(): Promise<Energia[] | null> {
    const energyProjects = energyData.getEnergyProjects();

    return energyProjects;
  }

  async getEnergyProject(id: number): Promise<Energia | null> {
    const energyProject = await energyData.getEnergyProject(id);
    if (!energyProject) throw new Error('Projeto de energia não encontrado');
    return energyProject;
  }

  async saveEnergyProject(energyProject: Energy): Promise<void> {
    await projectService.getProject(energyProject.projeto_id);

    const existingEnergyProject = await energyData.getEnergyProject(
      energyProject.projeto_id,
    );

    if (existingEnergyProject) {
      throw new Error('Projeto de energia já existe');
    }

    return energyData.saveEnergyProject(energyProject);
  }

  async updateEnergyProject(energyProject: Energy): Promise<void> {
    const existingProject = await energyService.getEnergyProject(
      energyProject.projeto_id,
    );

    if (!existingProject) {
      throw new Error('Projeto de energia não encontrado');
    }

    return energyData.updateEnergyProject(energyProject);
  }

  deleteEnergyProject(id: number) {
    return energyData.deleteEnergyProject(id);
  }
}

export const energyService = new EnergyService();
