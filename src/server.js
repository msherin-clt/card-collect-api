import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Updated for docs
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import seriesRoutes from './routes/seriesRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import setRoutes from './routes/setRoutes.js';
import userRoutes from './routes/userRoutes.js';
import deckRoutes from './routes/deckRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
// Updated from docs
const specs = YAML.load('./public/bundled.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/series', seriesRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/sets', setRoutes);
app.use('/', userRoutes);
app.use('/api/users/me/decks', deckRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));