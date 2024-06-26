import { Router } from 'express';
const router = Router();
import message from './waController.js';

router.get('/:message/:number', message.sendMessage);
router.get('/group/:message/:id', message.sendGroupMessage);

export default router;