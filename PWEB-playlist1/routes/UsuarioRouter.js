// routes/UsuarioRouter.js
import { Router } from 'express';
import { Usuario } from '../models/Index.js'; // ✅ certo

const router = Router();

// GET /usuarios
router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

// GET /usuarios/:id
router.get('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado' });
  }
});

// POST /usuarios
router.post('/', async (req, res) => {
  try {
    const novo = await Usuario.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /usuarios/:id
router.put('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (usuario) {
    await usuario.update(req.body);
    res.json(usuario);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado' });
  }
});

// DELETE /usuarios/:id
router.delete('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (usuario) {
    await usuario.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Usuário não encontrado' });
  }
});

export default router;
