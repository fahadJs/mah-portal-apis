import { Router } from "express";
const router = Router();
import methods from './pdfController.js';

router.get('/pdf/:name/:number/:agent', methods.sendAllFiles);

export default router;