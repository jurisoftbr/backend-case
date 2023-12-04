/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HTTP_STATUS } from '../http/statuses';
import { BadCredentialsError } from '@/domain/auth/errors/bad-credentials';
import { LawyerAlreadyExistsError } from '@/domain/auth/errors/lawyer-already-exists';
import { DocumentNotFoundError } from '@/domain/documents/errors/document-not-found';
import { DocumentOwnerError } from '@/domain/documents/errors/document-owner';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { NextFunction, Request, Response } from 'express';
import { InvalidDocumentExtension } from '@/domain/documents/errors/invalid-document-extension';
import { DeleteDocumentFileError } from '@/domain/documents/errors/delete-document-file';
import { InvalidTokenError } from '@/domain/auth/errors/invalid-token';

export function catchAllErrors(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof DocumentOwnerError) {
    return response
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: error.message });
  }

  if (
    error instanceof LawyerAlreadyExistsError ||
    error instanceof BadCredentialsError ||
    error instanceof InvalidTokenError
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

  if (
    error instanceof InvalidDocumentExtension ||
    error instanceof DeleteDocumentFileError
  ) {
    return response
      .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
      .json({ message: error.message });
  }

  console.error(error);
  return response
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal error' });
}
