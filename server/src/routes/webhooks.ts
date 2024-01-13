import { Router } from 'express';
import { User } from '../models';
import { WEBHOOK_APP_UNINSTALLED } from '../utils/constants/webhooks';

const router = Router();

router.post(WEBHOOK_APP_UNINSTALLED.endpoint, async (req, res) => {
  try {
    if (!req.user) throw new Error('Invalid request');
    await User.findByIdAndDelete(req.user._id);
  } catch (error) {
    console.error(error, error);
    // log failed webhook
  }
  res.statusCode = 200;
  return res.write('Webhook recieved successfully');
});

export default router;
