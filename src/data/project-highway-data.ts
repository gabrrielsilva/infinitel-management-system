import { Rodovia } from '@prisma/client';
import { client } from '../../db/client';
import { Highway } from '../model/Highway';

class HighwayData {
  getHighwayProjects(): Promise<Rodovia[] | null> {
    return client.rodovia.findMany();
  }

  getHighwayProject(id: number): Promise<Rodovia | null> {
    const projectSurvey = client.rodovia.findUnique({
      where: {
        projeto_id: id,
      },
    });

    return projectSurvey;
  }

  async saveHighwayProject(highwayProject: Highway): Promise<void> {
    await client.rodovia.create({
      data: {
        projeto_id: highwayProject.projeto_id,
        data_prevista: highwayProject.data_prevista,
        reprogramacao: highwayProject.reprogramacao,
        atraso: highwayProject.atraso,
        data_real_protocolo: highwayProject.data_real_protocolo,
        sla_x: highwayProject.sla_x,
        num_protocolo: highwayProject.num_protocolo,
        status_operacional: highwayProject.status_operacional,
        data_aprov_prevista: highwayProject.data_aprov_prevista,
        data_aprov_real: highwayProject.data_aprov_real,
        sla_y: highwayProject.sla_y,
        observacoes: highwayProject.observacoes,
      },
    });
  }

  async updateHighwayProject(highwayProject: Highway): Promise<void> {
    await client.rodovia.update({
      data: {
        data_prevista: highwayProject.data_prevista,
        reprogramacao: highwayProject.reprogramacao,
        atraso: highwayProject.atraso,
        data_real_protocolo: highwayProject.data_real_protocolo,
        sla_x: highwayProject.sla_x,
        num_protocolo: highwayProject.num_protocolo,
        status_operacional: highwayProject.status_operacional,
        data_aprov_prevista: highwayProject.data_aprov_prevista,
        data_aprov_real: highwayProject.data_aprov_real,
        sla_y: highwayProject.sla_y,
        observacoes: highwayProject.observacoes,
      },
      where: {
        projeto_id: highwayProject.projeto_id,
      },
    });
  }

  async deleteHighwayProject(id: number): Promise<void> {
    await client.rodovia.delete({
      where: {
        projeto_id: id,
      },
    });
  }
}

export const highwayData = new HighwayData();
