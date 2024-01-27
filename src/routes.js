import { Router } from 'express';
import { AuthController } from './modules/auth/controller.js';
import { DocumentController } from './modules/document/controller.js';

const router = Router();

router.use('/auth', AuthController);
router.use('/', DocumentController);

export default router;
