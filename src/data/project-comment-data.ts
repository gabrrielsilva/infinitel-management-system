import { Observacoes } from '@prisma/client';
import { client } from '../../db/client';
import { Comment } from '../model/Comment';

class CommentData {
  getCommentProjects(): Promise<Observacoes[] | null> {
    return client.observacoes.findMany();
  }

  getCommentProject(id: number): Promise<Observacoes | null> {
    const projectSurvey = client.observacoes.findUnique({
      where: {
        projeto_id: id,
      },
    });

    return projectSurvey;
  }

  async saveCommentProject(commentProject: Comment): Promise<void> {
    await client.observacoes.create({
      data: {
        projeto_id: commentProject.projeto_id,
        observacoes_gerais: commentProject.observacoes_gerais,
      },
    });
  }

  async updateCommentProject(commentProject: Comment): Promise<void> {
    await client.observacoes.update({
      data: {
        observacoes_gerais: commentProject.observacoes_gerais,
      },
      where: {
        projeto_id: commentProject.projeto_id,
      },
    });
  }

  async deleteCommentProject(id: number): Promise<void> {
    await client.observacoes.delete({
      where: {
        projeto_id: id,
      },
    });
  }
}

export const commentData = new CommentData();
