import { Router } from 'express';
import { PlaylistFilme } from '../models/PlaylistFilme';

const router = Router();

// GET: listar todos os relacionamentos
router.get('/', async (req, res) => {
  const lista = await PlaylistFilme.findAll();
  res.json(lista);
});

// POST: adicionar filme à playlist
router.post('/', async (req, res) => {
  const novo = await PlaylistFilme.create(req.body);
  res.status(201).json(novo);
});

// PUT: atualizar relação (caso tenha campos extras)
router.put('/:id', async (req, res) => {
  await PlaylistFilme.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(204);
});

// DELETE: remover relação
router.delete('/:id', async (req, res) => {
  await PlaylistFilme.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

export default router;
