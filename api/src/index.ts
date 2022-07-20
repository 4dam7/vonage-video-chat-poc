import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { apiLogger, logger } from './utils';
import { Route } from './typings';

import connectToMongoDB from './services/db/config';
import routes from './modules/routes';

dotenv.config();

// CONNECT TO MONGO
try {
  connectToMongoDB();
} catch (e) {
  logger.error(e);
}

const PORT = process.env.PORT ?? 8080;

const app = express();

logger.info(`CORS : ${process.env.FRONT_URL}`);
app.use(
  cors({
    origin: [process.env.FRONT_URL],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(apiLogger);

app.get('/', (_, res) => {
  return res.send();
});

routes.forEach((route: Route) => {
  app.use(route.path, route.router);
  logger.info(`Route ${route.path} loaded`);
});

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

export default app;
