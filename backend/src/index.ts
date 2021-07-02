import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_URL = process.env.API_URL;

app.use(express.json());

app.get(`${API_URL}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'hair dresser',
    image: 'some_url',
  };
  res.send(product);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
