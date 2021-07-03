import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_URL = process.env.API_URL;

app.use(express.json());
app.use(morgan('tiny'));

app.get(`${API_URL}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'hair dresser',
    image: 'some_url',
  };
  res.send(product);
});

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
