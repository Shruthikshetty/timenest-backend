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
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from './commons/utils/logger';
import { corsOptions } from './commons/utils/cors';

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
app.use(cors(corsOptions));

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
 * create server
 */
const server = createServer(app);
export const io = new Server(server, {
  cors: corsOptions,
});

//@TODO add auth for this socket
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    socket.join(userId);
    logger.info(`User ${userId} joined their room`);
  }
});

/**
 * listen to the server
 */
server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

/**
 * Export the Express app instance for testing.
 */
export default server;
