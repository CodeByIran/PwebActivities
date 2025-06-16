import { Router } from 'express';
import { Comentario } from '../models/Index.js';

const router = Router();

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
