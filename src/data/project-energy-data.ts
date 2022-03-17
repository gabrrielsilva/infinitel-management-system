import { Energia } from '@prisma/client';
import { client } from '../../db/client';
import { Energy } from '../model/Energy';

class EnergyData {
  getEnergyProjects(): Promise<Energia[] | null> {
    return client.energia.findMany();
  }

  getEnergyProject(id: number): Promise<Energia | null> {
    const projectSurvey = client.energia.findUnique({
      where: {
        projeto_id: id,
      },
    });

    return projectSurvey;
  }

  async saveEnergyProject(energyProject: Energy): Promise<void> {
    await client.energia.create({
      data: {
        projeto_id: energyProject.projeto_id,
        data_prevista: energyProject.data_prevista,
        reprogramacao: energyProject.reprogramacao,
        atraso: energyProject.atraso,
        data_real_protocolo: energyProject.data_real_protocolo,
        sla_x: energyProject.sla_x,
        num_protocolo: energyProject.num_protocolo,
        status_operacional: energyProject.status_operacional,
        data_aprov_prevista: energyProject.data_aprov_prevista,
        data_aprov_real: energyProject.data_aprov_real,
        sla_y: energyProject.sla_y,
        observacoes: energyProject.observacoes,
      },
    });
  }

  async updateEnergyProject(energyProject: Energy): Promise<void> {
    await client.energia.update({
      data: {
        data_prevista: energyProject.data_prevista,
        reprogramacao: energyProject.reprogramacao,
        atraso: energyProject.atraso,
        data_real_protocolo: energyProject.data_real_protocolo,
        sla_x: energyProject.sla_x,
        num_protocolo: energyProject.num_protocolo,
        status_operacional: energyProject.status_operacional,
        data_aprov_prevista: energyProject.data_aprov_prevista,
        data_aprov_real: energyProject.data_aprov_real,
        sla_y: energyProject.sla_y,
        observacoes: energyProject.observacoes,
      },
      where: {
        projeto_id: energyProject.projeto_id,
      },
    });
  }

  async deleteEnergyProject(id: number): Promise<void> {
    await client.energia.delete({
      where: {
        projeto_id: id,
      },
    });
  }
}

export const energyData = new EnergyData();
