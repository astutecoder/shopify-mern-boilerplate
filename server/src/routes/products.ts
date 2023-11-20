import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { fetchGql } from '../services/fetch-gql';

const router = Router();

router.post('/', isAuthenticated, async (req, res, next) => {
  const { query, variables } = req.body;

  try {
    const data = await fetchGql(req.user!, query, variables);
    const products = await data.json();

    res.json(products);
  } catch (error) {
    console.log('error', error);
    next(error);
  }
});

export default router;
