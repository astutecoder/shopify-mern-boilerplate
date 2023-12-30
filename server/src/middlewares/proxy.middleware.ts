import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { createHmac } from 'crypto';
import { SHOPIFY_CLIENT_SECRET } from '../utils/constants/global';

export const isValidProxyRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { signature, ...query } = req.query;
    const orderedQuery = Object.keys(query)
      .sort()
      .reduce((obj: Record<string, any>, key: string) => {
        obj[key] = query[key];
        return obj;
      }, {});

    const queryParams = decodeURIComponent(
      new URLSearchParams(orderedQuery).toString().replace(/\&/g, '')
    );

    const newHmac = createHmac('sha256', SHOPIFY_CLIENT_SECRET!)
      .update(queryParams)
      .digest('hex');

    if (newHmac !== signature) throw new Error('Not a valid request');

    const shop = await User.findOne({ shop: query.shop });

    if (!shop) throw new Error('Not a valid store');

    req.user = { shop: shop.shop, password: shop.password };
    next();
  } catch (error) {
    next(error);
  }
};
