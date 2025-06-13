//  CORS config
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

// Express CORS config
export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
