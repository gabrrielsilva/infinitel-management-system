import { Router, Request, Response, NextFunction } from 'express';
import { Comment } from '../model/Comment';
import { commentService } from '../service/project-comment-service';

const commentRouter = Router();

commentRouter.get(
  '/observacoes-gerais',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentProjects = await commentService.getCommentProjects();

      return res.json(commentProjects);
    } catch (e) {
      next(e);
    }
  },
);

commentRouter.get(
  '/observacoes-gerais/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentProject = await commentService.getCommentProject(
        Number(req.params.id),
      );

      return res.json(commentProject);
    } catch (e) {
      next(e);
    }
  },
);

commentRouter.post(
  '/observacoes-gerais',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentProject: Comment = req.body;
      await commentService.saveCommentProject(commentProject);

      return res.status(201).end();
    } catch (e) {
      next(e);
    }
  },
);

commentRouter.put(
  '/observacoes-gerais/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentProject: Comment = req.body;
      const projetoId = Number(req.params.id);
      await commentService.updateCommentProject({
        ...commentProject,
        projeto_id: projetoId,
      });

      res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

commentRouter.delete(
  '/observacoes-gerais/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commentService.deleteCommentProject(Number(req.params.id));

      res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
);

export { commentRouter };
