import mongoose from 'mongoose';

import { logger } from '../../utils';

const connectToMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 3000,
    })
    .then(() => {})
    .catch(() => {});
};

mongoose.connection.on('connected', () => logger.info('MongoDB connected!'));
mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected!');
  connectToMongoDB();
});
mongoose.connection.on('reconnected', () =>
  logger.info('MongoDB reconnected!'),
);
mongoose.connection.once('open', () =>
  logger.info('MongoDB connection opened!'),
);

process.on('SIGINT', () => {
  mongoose.connection
    .close()
    .then(() => logger.info('MongoDB disconnected through app termination'))
    .catch(() => {});
  process.exit(0);
});

export default connectToMongoDB;
