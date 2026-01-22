import { Router } from 'express';
import { createCtClient } from '../services/ctClient';

const router = Router();

router.get('/products/published', async (_req, res) => {
  try {
    const apiRoot = createCtClient();

    const response = await apiRoot
      .products()
      .get({
        queryArgs: {
          where: 'masterData(published=true)',
          limit: 20
        }
      })
      .execute();

    const products = response.body.results.map(p => ({
      id: p.id,
      key: p.key,
      name: p.masterData.current.name,
      slug: p.masterData.current.slug,
      published: p.masterData.published
    }));

    res.json({ count: products.length, products });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch published products',
      error: error.message
    });
  }
});

export default router;