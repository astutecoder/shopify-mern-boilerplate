import { Router } from 'express';
import { User } from '../models';
import { WEBHOOK_APP_UNINSTALLED } from '../utils/constants/webhooks';
import { isValidWebhookRequest } from '../middlewares/webhook.middleware';

const router = Router();

router.post(
  WEBHOOK_APP_UNINSTALLED.endpoint,
  isValidWebhookRequest,
  async (req, res) => {
    try {
      if (!req.user) throw new Error('Invalid request');
      await User.findOneAndDelete({ shop: req.user._id });
    } catch (error) {
      // log failed webhook
    }
    return res.status(200).send('Webhook recieved successfully');
  }
);

export default router;
