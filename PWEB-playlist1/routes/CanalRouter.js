import { Router } from 'express';
import { Canal } from '../models/Canal.js';

const router = Router();

router.get('/', async (req, res) => {
  const canais = await Canal.findAll();
  res.json(canais);
});

router.get('/:id', async (req, res) => {
  const canal = await Canal.findByPk(req.params.id);
  canal ? res.json(canal) : res.status(404).json({ error: 'Canal não encontrado' });
});

router.post('/', async (req, res) => {
  try {
    const novo = await Canal.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const canal = await Canal.findByPk(req.params.id);
  if (canal) {
    await canal.update(req.body);
    res.json(canal);
  } else {
    res.status(404).json({ error: 'Canal não encontrado' });
  }
});

router.delete('/:id', async (req, res) => {
  const canal = await Canal.findByPk(req.params.id);
  canal ? (await canal.destroy(), res.status(204).end()) : res.status(404).json({ error: 'Canal não encontrado' });
});

export default router;
