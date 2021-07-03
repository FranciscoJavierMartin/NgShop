import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import productsRouter from './routers/products';
import categoriesRouter from './routers/categories';
import usersRouter from './routers/user';
import ordersRouter from './routers/orders';

config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_URL = process.env.API_URL;

app.use(cors());
// app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));

app.use(`${API_URL}/products`, productsRouter);
app.use(`${API_URL}/categories`, categoriesRouter);
app.use(`${API_URL}/users`, usersRouter);
app.use(`${API_URL}/orders`, ordersRouter);

mongoose
  .connect(process.env.DATABASE!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection ready'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
