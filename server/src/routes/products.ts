import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { SHOPIFY_API_VERSION } from '../utils/constants/global';
import fetch from 'node-fetch';

const router = Router();

router.post('/', isAuthenticated, async (req, res, next) => {
  const shop = req.user?.shop!;
  const { query, variables } = req.body;

  const url = `https://${shop}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;
  try {
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': req.user?.token!,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const products = await data.json();

    res.json(products);
  } catch (error) {
    console.log('error', error);
    next(error);
  }
});

export default router;
