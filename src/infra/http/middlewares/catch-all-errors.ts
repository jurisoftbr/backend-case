/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HTTP_STATUS } from '../statuses';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '@/core/errors/unauthorized';
import { NotFoundError } from '@/core/errors/not-found';
import { BadRequestError } from '@/core/errors/bad-request';
import { UnprocessableEntityError } from '@/core/errors/unprocessable-entity';

export function catchAllErrors(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof BadRequestError) {
    return response
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: error.message });
  }

  if (error instanceof UnauthorizedError) {
    return response
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: error.message });
  }

  if (error instanceof NotFoundError) {
    return response
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: error.message });
  }

  if (error instanceof UnprocessableEntityError) {
    return response
      .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
      .json({ message: error.message });
  }

  console.error(error);
  return response
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal error' });
}
