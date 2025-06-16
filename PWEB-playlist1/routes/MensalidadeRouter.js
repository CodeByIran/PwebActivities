import { Router } from 'express';
import { Mensalidade } from '../models/Mensalidade';

const router = Router();

router.get('/', async (req, res) => {
  const mensalidades = await Mensalidade.findAll();
  res.json(mensalidades);
});

router.get('/:id', async (req, res) => {
  const mensalidade = await Mensalidade.findByPk(req.params.id);
  mensalidade ? res.json(mensalidade) : res.status(404).json({ error: 'Mensalidade não encontrada' });
});

router.post('/', async (req, res) => {
  try {
    const nova = await Mensalidade.create(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const mensalidade = await Mensalidade.findByPk(req.params.id);
  if (mensalidade) {
    await mensalidade.update(req.body);
    res.json(mensalidade);
  } else {
    res.status(404).json({ error: 'Mensalidade não encontrada' });
  }
});

router.delete('/:id', async (req, res) => {
  const mensalidade = await Mensalidade.findByPk(req.params.id);
  mensalidade ? (await mensalidade.destroy(), res.status(204).end()) : res.status(404).json({ error: 'Mensalidade não encontrada' });
});

export default router;
