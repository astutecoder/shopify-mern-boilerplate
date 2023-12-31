import { createHmac } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { SHOPIFY_CLIENT_SECRET } from '../utils/constants/global';
import { User } from '../models';

export const isValidWebhookRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const signature = req.headers['x-shopify-hmac-sha256'];
    const shopDomain = req.headers['x-shopify-shop-domain'];

    const newHmac = createHmac('sha256', SHOPIFY_CLIENT_SECRET!)
      .update(JSON.stringify(req.body))
      .digest('base64');

    if (newHmac !== signature) throw new Error('Not a valid request');

    const shop = await User.findOne({ shop: shopDomain });

    if (!shop) throw new Error('Not a valid store');

    req.user = { shop: shop.shop, password: shop.password };
    next();
  } catch (error) {
    console.log('error', error);
  }
  return res.status(200).send('Webhook recieved successfully');
};
