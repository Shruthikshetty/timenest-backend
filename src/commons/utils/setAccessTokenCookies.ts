import { Response } from 'express';

/**
 * @param accessToken string
 * @param refreshToken string
 * @description Sets access and refresh tokens as cookies in the response.
 */
export const setAccessTokenCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {
  const secureCookie = process.env.COOKIE_SECURE === 'true';

  res.cookie('accessToken', accessToken, {
    httpOnly: false, // normal cookie so JS can read it
    secure: secureCookie,
    sameSite: secureCookie ? 'none' : 'lax',
    maxAge: 60 * 60 * 1000, // 60 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // secure from JS access
    secure: secureCookie,
    sameSite: secureCookie ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
