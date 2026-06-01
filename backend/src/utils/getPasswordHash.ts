import crypto from 'crypto';
import { env } from '../Lib/env';

export const getPasswordHash = (password: string) => {
  return crypto.createHash('sha256').update(`${env.PASSWORD_SALT}${password}`).digest('hex');
};
