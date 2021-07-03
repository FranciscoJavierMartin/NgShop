import { Router } from 'express';
import { Order } from '../models/order';

const router = Router();

router.get('/', async (req, res) => {
  const orderList = await Order.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }

  res.send(orderList);
});

export default router;
