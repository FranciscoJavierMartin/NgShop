import { Router } from 'express';
import { Category } from '../models/category';

const router = Router();

router.get('/', async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }

  res.send(categoryList);
});

export default router;
