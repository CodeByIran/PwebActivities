import { Router } from 'express';
import { Playlist } from '../models/Playlist';

const router = Router();

router.get('/', async (req, res) => {
  const playlists = await Playlist.findAll();
  res.json(playlists);
});

router.get('/:id', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);
  playlist ? res.json(playlist) : res.status(404).json({ error: 'Playlist não encontrada' });
});

router.post('/', async (req, res) => {
  try {
    const nova = await Playlist.create(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);
  if (playlist) {
    await playlist.update(req.body);
    res.json(playlist);
  } else {
    res.status(404).json({ error: 'Playlist não encontrada' });
  }
});

router.delete('/:id', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);
  playlist ? (await playlist.destroy(), res.status(204).end()) : res.status(404).json({ error: 'Playlist não encontrada' });
});

export default router;
