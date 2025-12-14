import { Router } from 'express';
import { handleCaktoWebhook } from '../controllers/webhookController';

const router = Router();

router.post('/cakto', handleCaktoWebhook);

export default router;
