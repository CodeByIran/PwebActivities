import { Router } from 'express';
import { CanalFilme } from '../models/CanalFilme.js';

const router = Router();

router.get('/', async (req, res) => {
  const lista = await CanalFilme.findAll();
  res.json(lista);
});

router.post('/', async (req, res) => {
  const novo = await CanalFilme.create(req.body);
  res.status(201).json(novo);
});

router.put('/:id', async (req, res) => {
  await CanalFilme.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(204);
});

router.delete('/:id', async (req, res) => {
  await CanalFilme.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

export default router;
