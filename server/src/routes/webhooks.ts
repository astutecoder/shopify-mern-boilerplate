import { Router } from 'express';
import { User } from '../models';
import { WEBHOOK_APP_UNINSTALLED } from '../utils/constants/webhooks';

const router = Router();

router.post(WEBHOOK_APP_UNINSTALLED.endpoint, async (req, res) => {
  const { myshopify_domain } = req.body;
  if (!myshopify_domain) return;

  try {
    const now = Date.now();
    await User.findOneAndDelete({ shop: myshopify_domain });
  } catch (error) {
    // log failed webhook
  }
  return res.status(200).send('Webhook recieved successfully');
});

export default router;
