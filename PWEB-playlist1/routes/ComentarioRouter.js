import { Router } from 'express';
import { Comentario, Filme } from '../models/Index.js';

const router = Router();


// Rota para listar comentários de um filme pelo id do filme
router.get('/:id/comentarios', async (req, res) => {
  try {
    const filmeId = req.params.id;

    // Verifica se o filme existe (opcional, mas recomendado)
    const filme = await Filme.findByPk(filmeId);
    if (!filme) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    // Busca os comentários relacionados ao filme
    const comentarios = await Comentario.findAll({
      where: { id_filme: filmeId }
    });

    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const comentarios = await Comentario.findAll();
  res.json(comentarios);
});

router.get('/:id', async (req, res) => {
  const comentario = await Comentario.findByPk(req.params.id);
  comentario ? res.json(comentario) : res.status(404).json({ error: 'Comentário não encontrado' });
});

router.post('/', async (req, res) => {
  try {
    const novo = await Comentario.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const comentario = await Comentario.findByPk(req.params.id);
  if (comentario) {
    await comentario.update(req.body);
    res.json(comentario);
  } else {
    res.status(404).json({ error: 'Comentário não encontrado' });
  }
});

router.delete('/:id', async (req, res) => {
  const comentario = await Comentario.findByPk(req.params.id);
  comentario ? (await comentario.destroy(), res.status(204).end()) : res.status(404).json({ error: 'Comentário não encontrado' });
});

export default router;
