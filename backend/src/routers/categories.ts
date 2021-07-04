import { Request, Router } from 'express';
import { Category } from '../models/category';

const router = Router();

router.get('/', async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }

  res.status(200).send(categoryList);
});

router.get('/:id', async (req: Request<{ id: string }>, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.status(200).send(category);
  } else {
    res
      .status(404)
      .json({ message: 'The category with the given ID was not found' });
  }
});

interface CreateCategoryRequestBody {
  name: string;
  icon: string;
  color: string;
}

router.post(
  '/',
  async (req: Request<any, any, CreateCategoryRequestBody>, res) => {
    const category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });

    const savedCategory = await category.save();

    if (!savedCategory) {
      res.status(500).send('Category cannot be created');
    } else {
      res.status(201).send(category);
    }
  }
);

interface UpdateCategoryRequestBody {
  name: string;
  icon: string;
  color: string;
}

router.put(
  '/:id',
  async (req: Request<{ id: string }, any, UpdateCategoryRequestBody>, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });

    if (updatedCategory) {
      res.send(updatedCategory);
    } else {
      res.status(400).send('Category cannot be updated');
    }
  }
);

router.delete('/:id', async (req: Request<{ id: string }>, res) => {
  try {
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);

    if (deletedCategory) {
      res.status(200).json({ success: true, message: 'Category removed' });
    } else {
      res
        .status(404)
        .json({ success: false, message: 'Category has not been removed' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

export default router;
