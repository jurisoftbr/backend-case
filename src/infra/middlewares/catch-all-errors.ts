/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HTTP_STATUS } from '@/core/utils/http-status';
import { BadCredentialsError } from '@/domain/auth/errors/bad-credentials';
import { LawyerAlreadyExistsError } from '@/domain/auth/errors/lawyer-already-exists';
import { DocumentNotFoundError } from '@/domain/documents/errors/document-not-found';
import { DocumentOwnerError } from '@/domain/documents/errors/document-owner';
import { LawyerNotFoundError } from '@/domain/documents/errors/lawyer-not-found';
import { NextFunction, Request, Response } from 'express';

export function catchAllErrors(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(`error in middleware: ${error}`);
  if (error instanceof DocumentOwnerError) {
    return response
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: error.message });
  }

  if (
    error instanceof LawyerAlreadyExistsError ||
    error instanceof BadCredentialsError
  ) {
    return response
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: error.message });
  }

  if (
    error instanceof LawyerNotFoundError ||
    error instanceof DocumentNotFoundError
  ) {
    return response
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: error.message });
  }

  console.error(error);
  return response
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal error' });
}
