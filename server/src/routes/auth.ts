import { Router } from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import {
  JWT_SECRET,
  SHOPIFY_CLIENT_ID,
  SHOPIFY_CLIENT_SECRET,
} from '../utils/constants/global';

const router = Router();

router.post('/check-me', async (req, res, next) => {
  const { shop } = req.body;

  try {
    if (!shop) throw new Error('bad request');

    const user = await User.findOne({
      shop,
      password: { $exists: true, $ne: '' },
    });

    if (!user) {
      return res.json({ authenticated: false });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET!);

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

    const token = jwt.sign({ id: user._id }, JWT_SECRET!);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
