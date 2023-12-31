import { Router } from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { User } from '../models';
import { registerWebhook } from '../services/webhooks';
import {
  JWT_SECRET,
  SHOPIFY_CLIENT_ID,
  SHOPIFY_CLIENT_SECRET,
} from '../utils/constants/global';
import { WEBHOOK_APP_UNINSTALLED } from '../utils/constants/webhooks';

const router = Router();

router.post('/check-me', async (req, res, next) => {
  const { shop } = req.body;

  try {
    if (!shop) throw new Error('bad request');

    const user = await User.findOne({ shop });

    if (!user) {
      return res.json({ authenticated: false });
    }

    const token = jwt.sign({ id: user._id, shop }, JWT_SECRET!);

    return res.json({ authenticated: true, token });
  } catch (error) {
    next(error);
  }
});

router.post('/retrive-token', async (req, res, next) => {
  const { shop, code } = req.body;
  const tokenUrl = `https://${shop}/admin/oauth/access_token?client_id=${SHOPIFY_CLIENT_ID}&client_secret=${SHOPIFY_CLIENT_SECRET}&code=${code}`;

  try {
    const data = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { access_token } = await data.json();
    let user = await User.findOne({ shop });

    if (user) {
      user.password = access_token;
      user.save();
    } else {
      user = await User.create({ shop, password: access_token });
    }

    const token = jwt.sign({ id: user._id, shop }, JWT_SECRET!);

    // register webhook for uninstall event
    registerWebhook(
      { shop: user.shop, password: user.password, _id: user._id },
      WEBHOOK_APP_UNINSTALLED.topic,
      WEBHOOK_APP_UNINSTALLED.endpoint
    );

    return res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
