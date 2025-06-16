// routes/routes.js
import { Router } from 'express';

import usuarioRouter from './UsuarioRouter.js';
import filmeRouter from './FilmeRouter.js';
import playlistRouter from './PlaylistRouter.js';
import canalRouter from './CanalRouter.js';
import comentarioRouter from './ComentarioRouter.js';
import mensalidadeRouter from './MensalidadeRouter.js';
import playlistFilmeRouter from './PlaylistFilmeRouter.js';
import canalFilmeRouter from './CanalFilmeRouter.js';

const router = Router();

router.use('/usuarios', usuarioRouter);
router.use('/filmes', filmeRouter);
router.use('/playlists', playlistRouter);
router.use('/canais', canalRouter);
router.use('/comentarios', comentarioRouter);
router.use('/mensalidades', mensalidadeRouter);
router.use('/playlist-filmes', playlistFilmeRouter);
router.use('/canal-filmes', canalFilmeRouter);

export default router;
