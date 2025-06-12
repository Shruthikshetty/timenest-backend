/**
 * @file Main entry point for the Time Set API server.
 * Initializes Express, loads environment variables, sets up middleware,
 * mounts all routes, and starts the server.
 */

import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import allRoutes from './routes/index.route';
import mongoose from 'mongoose';
import { requestLogger } from './commons/middlewares/requestLogger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
/**
 * Load environment variables from .env file into process.env
 */
dotenv.config();

/**
 * connect to our mongo db database
 */
mongoose
  .connect(process.env?.MONGO_URI ?? '')
  .then(() => {
    console.log('Mongo DB connected');
  })
  .catch((err) => {
    console.log('failed to connect to database', JSON.stringify(err, null, 2));
  });

/**
 * Create an Express application instance
 */
const app: Application = express();

/**
 * Define the port to listen on.
 * Uses PORT from environment variables, or defaults to 3000 if not set.
 */
const PORT = process.env.PORT || 3000;

/**
 * Middleware to parse incoming JSON request bodies.
 * This allows your API to accept JSON payloads.
 */
app.use(express.json());

/**
 * Middleware to parse cookies
 */
app.use(cookieParser());

/**
 * cors policy middleware
 */
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // Dynamically allow any origin @TODO will be fixed when in production with a allow list
    },
    credentials: true,
  })
);

/**
 * Middleware to log all request
 * using winston
 */
app.use(requestLogger);

/**
 * Mount all feature routes under the '/api' base path.
 * All routes defined in 'allRoutes' will be accessible under '/api'.
 * Example: '/api/users', '/api/messages', etc.
 */
app.use('/api', allRoutes);

/**
 * Base route for health check or welcome message.
 * Visiting the root URL ('/') will return a simple welcome message.
 */
app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to Time Set API!');
});

/**
 * Start the Express server and listen on the defined port.
 * Logs a message to the console once the server is running.
 */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

/**
 * Export the Express app instance for testing.
 */
export default app;
