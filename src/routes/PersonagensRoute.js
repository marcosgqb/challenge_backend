import express from 'express';
import PersonagensController from '../controllers/PersonagensController';

const router = express.Router();

router
  .get('/personagens', PersonagensController.getPrincipaisPersonagens)
  .get('/personagens/:ids', PersonagensController.getDetalheDeUmPersonagem)
  .get('/personagens/:id/livros', PersonagensController.getLivrosDeUmPersonagem);

export default router;
