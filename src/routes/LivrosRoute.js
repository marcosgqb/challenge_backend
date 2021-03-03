import express from 'express';
import LivrosController from '../controllers/LivrosController';

const router = express.Router();

router
  .get('/livros/:ids', LivrosController.getCapaDeUmLivro);

export default router;
