import { Ferrovia } from '@prisma/client';
import { client } from '../../db/client';
import { Railway } from '../model/Railway';

class RailwayData {
  getRailwayProjects(): Promise<Ferrovia[] | null> {
    return client.ferrovia.findMany();
  }

  getRailwayProject(id: number): Promise<Ferrovia | null> {
    const projectSurvey = client.ferrovia.findUnique({
      where: {
        projeto_id: id,
      },
    });

    return projectSurvey;
  }

  async saveRailwayProject(railwayProject: Railway): Promise<void> {
    await client.ferrovia.create({
      data: {
        projeto_id: railwayProject.projeto_id,
        data_prevista: railwayProject.data_prevista,
        reprogramacao: railwayProject.reprogramacao,
        atraso: railwayProject.atraso,
        data_real_protocolo: railwayProject.data_real_protocolo,
        sla_x: railwayProject.sla_x,
        num_protocolo: railwayProject.num_protocolo,
        status_operacional: railwayProject.status_operacional,
        data_aprov_prevista: railwayProject.data_aprov_prevista,
        data_aprov_real: railwayProject.data_aprov_real,
        sla_y: railwayProject.sla_y,
        observacoes: railwayProject.observacoes,
      },
    });
  }

  async updateRailwayProject(railwayProject: Railway): Promise<void> {
    await client.ferrovia.update({
      data: {
        data_prevista: railwayProject.data_prevista,
        reprogramacao: railwayProject.reprogramacao,
        atraso: railwayProject.atraso,
        data_real_protocolo: railwayProject.data_real_protocolo,
        sla_x: railwayProject.sla_x,
        num_protocolo: railwayProject.num_protocolo,
        status_operacional: railwayProject.status_operacional,
        data_aprov_prevista: railwayProject.data_aprov_prevista,
        data_aprov_real: railwayProject.data_aprov_real,
        sla_y: railwayProject.sla_y,
        observacoes: railwayProject.observacoes,
      },
      where: {
        projeto_id: railwayProject.projeto_id,
      },
    });
  }

  async deleteRailwayProject(id: number): Promise<void> {
    await client.ferrovia.delete({
      where: {
        projeto_id: id,
      },
    });
  }
}

export const railwayData = new RailwayData();
