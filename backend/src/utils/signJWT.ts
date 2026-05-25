import jwt from 'jsonwebtoken';
import { env } from '../Lib/env';

export const signJWT = (userId: string): string => {
  return jwt.sign(userId, env.JWT_SECRET);
};
