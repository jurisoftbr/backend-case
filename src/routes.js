import { Router } from 'express';
import { AuthController } from './modules/auth/controller.js';
import { DocumentController } from './modules/document/controller.js';
import { ensureAuth } from './modules/auth/middlewares/ensureAuth.js';

const router = Router();

router.use('/auth', AuthController);
router.use('/', ensureAuth.Authenticated, DocumentController);

export default router;
