import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { connect } from './config/db';
import errorHandler from './middleware/errorHandlerMiddleware';
import logger from './utils/logger';
import authRouter from './routes/auth';
import categoryRouter from './routes/category';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import dashboardRouter from './routes/dashboard';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger';

const app: Application = express();
const PORT = process.env.PORT ?? 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  'https://craftopia-mauve.vercel.app/',
  'http://localhost:5173',
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
  }),
);

app.use(helmet());

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Testing root endpoint
app.get('/', async (req: Request, res: Response) => {
  res.send('Hey this is my API running 🥳');
});

// Routes
// Auth Route
app.use('/api/v1/auth', authRouter);
// Category Route
app.use('/api/v1/category', categoryRouter);
// Product Route
app.use('/api/v1/product', productRouter);
// Order Route
app.use('/api/v1/order', orderRouter);
// Dashboard Route
app.use('/api/v1/dashboard', dashboardRouter);

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
connect()
  .then(() => {
    logger.info('Connected to database!');
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
      app.emit('ready'); // emit the ready event
    });
  })
  .catch((err: Error) => {
    console.error(err);
  });

export default app;
