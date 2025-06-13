//  CORS config
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

// Express CORS config
export const corsOptions = {
  origin: (origin, callback) => {
    callback(null, origin); // Dynamically allow any origin @TODO will be fixed when in production with a allow list
  },
  // credentials: true,
};
