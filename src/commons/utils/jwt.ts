/**
 * @file holds the utils related to jwt token generation and validation
 */

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

//config to use env variables
dotenv.config();

// get token from env
// the fallbacks will never be used in production , they may be used in dev modes if the env is not provided
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key';

//token payload type
export type TokenPayload = {
  userId: string;
  email: string;
};

/**
 * this is used to generate both access and refresh tokens
 * @param payload TokenPayload
 * @returns  accessToken  ,  refreshToken
 */
export const generateTokens = (payload: TokenPayload) => {
  // access token config
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  // refresh token config
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

// this is used to verify the user token
export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

// this is used to verify the refresh token
export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
};
