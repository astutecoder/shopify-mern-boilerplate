import { createHmac } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import getRawBody from 'raw-body';
import { User } from '../models';
import { SHOPIFY_CLIENT_SECRET } from '../utils/constants/global';

export const isValidWebhookRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const signature = req.get('X-Shopify-Hmac-Sha256');
    const shopDomain = req.get('x-shopify-shop-domain');
    const data = await getRawBody(req);

    const newHmac = createHmac('sha256', SHOPIFY_CLIENT_SECRET!)
      .update(data)
      .digest('base64');

    if (newHmac !== signature) throw new Error('Not a valid request');

    const shop = await User.findOne({ shop: shopDomain });

    if (!shop) throw new Error('Not a valid store');

    req.user = { shop: shop.shop, password: shop.password, _id: shop._id };
    next();
  } catch (error) {
    console.log('error', error);
  }
  return res.status(200).send('Webhook recieved successfully');
};
