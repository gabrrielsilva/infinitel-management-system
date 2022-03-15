import { Executivo } from '@prisma/client';
import { client } from '../../db/client';
import { Executive } from '../model/Executive';

class ExecutiveData {
  getExecutiveProjects(): Promise<Executivo[] | null> {
    return client.executivo.findMany();
  }

  getExecutiveProject(id: number): Promise<Executivo | null> {
    const projectSurvey = client.executivo.findUnique({
      where: {
        projeto_id: id,
      },
    });

    return projectSurvey;
  }

  async saveExecutiveProject(executiveProject: Executive): Promise<void> {
    await client.executivo.create({
      data: {
        projeto_id: executiveProject.project_id,
        data_acionamento: executiveProject.data_acionamento,
        data_aceita_exec: executiveProject.data_aceita_exec,
        executor: executiveProject.executor,
        status_tim: executiveProject.status_tim,
        data_tim: executiveProject.data_tim,
        status_lic_tbr: executiveProject.status_lic_tbr,
      },
    });
  }

  async updateExecutiveProject(executiveProject: Executive): Promise<void> {
    await client.executivo.update({
      data: {
        projeto_id: executiveProject.project_id,
        data_acionamento: executiveProject.data_acionamento,
        data_aceita_exec: executiveProject.data_aceita_exec,
        executor: executiveProject.executor,
        status_tim: executiveProject.status_tim,
        data_tim: executiveProject.data_tim,
        status_lic_tbr: executiveProject.status_lic_tbr,
      },
      where: {
        projeto_id: executiveProject.project_id,
      },
    });
  }

  async deleteExecutiveProject(id: number): Promise<void> {
    await client.executivo.delete({
      where: {
        projeto_id: id,
      },
    });
  }
}

export const executiveData = new ExecutiveData();
