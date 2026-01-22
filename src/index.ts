import 'dotenv/config';
import express from 'express';
import productsRoute from './routes/products';

const app = express();
const port = process.env.PORT || 8080;

app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

app.use('/', productsRoute);

app.listen(port, () => {
  console.log(`Connect app running on port ${port}`);
});