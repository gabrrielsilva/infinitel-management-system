import { Prefeitura } from '@prisma/client';
import { client } from '../../db/client';
import { Prefecture } from '../model/Prefecture';

class PrefectureData {
  getPrefectureProjects(): Promise<Prefeitura[] | null> {
    return client.prefeitura.findMany();
  }

  getPrefectureProject(id: number): Promise<Prefeitura | null> {
    const projectSurvey = client.prefeitura.findUnique({
      where: {
        projeto_id: id,
      },
    });

    return projectSurvey;
  }

  async savePrefectureProject(prefectureProject: Prefecture): Promise<void> {
    await client.prefeitura.create({
      data: {
        projeto_id: prefectureProject.projeto_id,
        data_prevista: prefectureProject.data_prevista,
        reprogramacao: prefectureProject.reprogramacao,
        atraso: prefectureProject.atraso,
        data_real_protocolo: prefectureProject.data_real_protocolo,
        sla_x: prefectureProject.sla_x,
        qtd_prefeitura: prefectureProject.qtd_prefeitura,
        num_protocolo: prefectureProject.num_protocolo,
        status_operacional: prefectureProject.status_operacional,
        data_aprov_prevista: prefectureProject.data_aprov_prevista,
        data_aprov_real: prefectureProject.data_aprov_real,
        sla_y: prefectureProject.sla_y,
        observacoes: prefectureProject.observacoes,
      },
    });
  }

  async updatePrefectureProject(prefectureProject: Prefecture): Promise<void> {
    await client.prefeitura.update({
      data: {
        data_prevista: prefectureProject.data_prevista,
        reprogramacao: prefectureProject.reprogramacao,
        atraso: prefectureProject.atraso,
        data_real_protocolo: prefectureProject.data_real_protocolo,
        sla_x: prefectureProject.sla_x,
        qtd_prefeitura: prefectureProject.qtd_prefeitura,
        num_protocolo: prefectureProject.num_protocolo,
        status_operacional: prefectureProject.status_operacional,
        data_aprov_prevista: prefectureProject.data_aprov_prevista,
        data_aprov_real: prefectureProject.data_aprov_real,
        sla_y: prefectureProject.sla_y,
        observacoes: prefectureProject.observacoes,
      },
      where: {
        projeto_id: prefectureProject.projeto_id,
      },
    });
  }

  async deletePrefectureProject(id: number): Promise<void> {
    await client.prefeitura.delete({
      where: {
        projeto_id: id,
      },
    });
  }
}

export const prefectureData = new PrefectureData();
