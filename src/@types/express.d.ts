// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

interface RequestUser {
  id: string;
  role: string;
}

declare module 'express' {
  interface Request {
    user?: RequestUser;
  }
}
