import { HTTP_STATUS } from '../http/statuses';
import { ValidTokenVerifier } from '@/domain/auth/providers/valid-token-verifier';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

const validTokenVerifier =
  container.resolve<ValidTokenVerifier>('ValidTokenVerifier');

export function authorization(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (
    request.path === '/auth/login' ||
    request.path === '/auth/create-lawyer'
  ) {
    next();
    return;
  }

  const token = request.headers.authorization;

  if (!token)
    return response
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: 'The token provided is invalid' });

  try {
    const authorizationData = validTokenVerifier.execute(token);

    request.user = authorizationData.getData();

    next();
  } catch (error) {
    next(error);
  }
}
