import { Router } from 'express';
import { Filme } from '../models/Filme';

const router = Router();

router.get('/', async (req, res) => {
  const filmes = await Filme.findAll();
  res.json(filmes);
});

router.get('/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  filme ? res.json(filme) : res.status(404).json({ error: 'Filme não encontrado' });
});

router.post('/', async (req, res) => {
  try {
    const novo = await Filme.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  if (filme) {
    await filme.update(req.body);
    res.json(filme);
  } else {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

router.delete('/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  filme ? (await filme.destroy(), res.status(204).end()) : res.status(404).json({ error: 'Filme não encontrado' });
});

export default router;
