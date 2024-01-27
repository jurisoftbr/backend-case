import { Router } from 'express';
import { AuthController } from './modules/auth/controller.js';
import { DocumentController, DocumentAdminController } from './modules/document/controller.js';
import { ensureAuth } from './modules/auth/middlewares/ensureAuth.js';

const router = Router();

router.use('/auth', AuthController);
router.use('/documents', ensureAuth.Authenticated, DocumentController);
router.use('/documents', ensureAuth.Admin, DocumentAdminController);

export default router;
