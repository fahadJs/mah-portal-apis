import { Router } from 'express';
const router = Router();
import methods from './autoController.js';

router.get('/', methods.autoScript);

export default router;