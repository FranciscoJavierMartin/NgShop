import { Request, Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { Category } from '../models/category';
import { Product } from '../models/product';

const router = Router();

router.get('/', async (req, res) => {
  const productList = await Product.find().populate('category');

  if (!productList) {
    res.status(500).json({ success: false });
  }

  res.send(productList);
});

router.get('/:id', async (req: Request<{ id: string }>, res) => {
  const product = await Product.findById(req.params.id).populate('category');

  if (product) {
    res.send(product);
  } else {
    res.status(500).json({ success: false });
  }
});

interface CreateProductRequestBody {
  name: string;
  description: string;
  richDescription: string;
  image: string;
  brand: string;
  price: number;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
}

router.post(
  '/',
  async (req: Request<any, any, CreateProductRequestBody>, res) => {
    const category = await Category.findById(req.body.category);

    if (!category) {
      res.status(400).send('Invalid category');
    } else {
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      });

      try {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
      } catch (err) {
        res.status(500).json({
          error: err,
          success: false,
        });
      }
    }
  }
);

interface UpdateProductRequestBody {
  name: string;
  description: string;
  richDescription: string;
  image: string;
  brand: string;
  price: number;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
}

router.put(
  '/:id',
  async (req: Request<{ id: string }, any, UpdateProductRequestBody>, res) => {
    if (isValidObjectId(req.params.id)) {
      res.status(400).send('Invalid product id');
    } else {
      const category = await Category.findById(req.body.category);

      if (!category) {
        res.status(400).send('Invalid category');
      } else {
        try {
          const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
              name: req.body.name,
              description: req.body.description,
              richDescription: req.body.richDescription,
              image: req.body.image,
              brand: req.body.brand,
              price: req.body.price,
              category: req.body.category,
              countInStock: req.body.countInStock,
              rating: req.body.rating,
              numReviews: req.body.numReviews,
              isFeatured: req.body.isFeatured,
            },
            { new: true }
          );

          res.status(200).json(updatedProduct);
        } catch (err) {
          res.status(500).json({
            error: err,
            success: false,
          });
        }
      }
    }
  }
);

router.delete('/:id', async (req: Request<{ id: string }>, res) => {
  try {
    const removedProduct = await Product.findByIdAndRemove(req.params.id);

    if (removedProduct) {
      res.status(200).json({ success: true, message: 'Product removed' });
    } else {
      res
        .status(404)
        .json({ success: false, message: 'Product has not been removed' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

router.get('/get/count', async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);

  if (productCount) {
    res.send({ count: productCount });
  } else {
    res.status(500).json({ success: false });
  }
});

export default router;
