import { Observacoes } from '@prisma/client';
import { commentData } from '../data/project-comment-data';
import { Comment } from '../model/Comment';
import { projectService } from './project-service';

class CommentService {
  getCommentProjects(): Promise<Observacoes[] | null> {
    const commentProjects = commentData.getCommentProjects();

    return commentProjects;
  }

  async getCommentProject(id: number): Promise<Observacoes | null> {
    const commentProject = await commentData.getCommentProject(id);
    if (!commentProject) throw new Error('Observação não encontrada');
    return commentProject;
  }

  async saveCommentProject(commentProject: Comment): Promise<void> {
    await projectService.getProject(commentProject.projeto_id);
    return commentData.saveCommentProject(commentProject);
  }

  async updateCommentProject(commentProject: Comment): Promise<void> {
    const existingProject = await commentService.getCommentProject(
      commentProject.projeto_id,
    );

    if (!existingProject) {
      throw new Error('Observação não encontrada');
    }

    return commentData.updateCommentProject(commentProject);
  }

  deleteCommentProject(id: number) {
    return commentData.deleteCommentProject(id);
  }
}

export const commentService = new CommentService();
