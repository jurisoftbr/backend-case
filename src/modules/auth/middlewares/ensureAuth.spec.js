import 'express-async-errors';
import jwt from 'jsonwebtoken';
import app from '../../../app.js';
import { ensureAuth } from '../middlewares/ensureAuth.js';
import { JWT_SECRET } from '../../../config.js';
import { errorHandler } from '../../../middlewares/errorHandler.js';
import * as utils from '../utils/getUserFromJwt.js';
import { afterEach, vitest } from 'vitest';
import request from 'supertest';

const VALID_TOKEN_DATA = {
	id: '5f8f8a8b4f4d4b1f8c9b4f4d',
	email: 'test@example.com',
	name: 'Test User',
	role: 'user',
};

const VALID_ADMIN_TOKEN_DATA = {
	id: '5f8f8a8b4f4d4b1f8c9b4f4d',
	email: 'test@admin.com',
	name: 'Test User',
	role: 'admin',
};

const spyOnGetUserFromJwt = vitest.spyOn(utils, 'getUserFromJwt');

describe('Middlewares - EnsureAuth', () => {
	const VALID_JWT = jwt.sign(VALID_TOKEN_DATA, JWT_SECRET);
	const VALID_ADMIN_JWT = jwt.sign(VALID_ADMIN_TOKEN_DATA, JWT_SECRET);
	const INVALID_JWT = jwt.sign(VALID_TOKEN_DATA, 'invalid-secret');

	const AUTHORIZED_ENDPOINT = '/authorized-endpoint';
	const ADMIN_ENDPOINT = '/admin-endpoint';

	app.get(ADMIN_ENDPOINT, ensureAuth.Admin, (req, res) => {
		res.status(200).send('OK');
	});
	app.get(AUTHORIZED_ENDPOINT, ensureAuth.Authenticated, (req, res) => {
		res.status(200).send('OK');
	});

	app.use(errorHandler);

	afterEach(() => {
		vitest.resetAllMocks();
	});

	describe('ensureAuth.Public', () => {
		it('should proceed to request if invalid token', () =>
			request(app).get(ADMIN_ENDPOINT).set('Authorization', `Bearer ${INVALID_JWT}`).expect(401));

		it('should proceed to request if valid token', () => {
			spyOnGetUserFromJwt.mockResolvedValueOnce(VALID_ADMIN_TOKEN_DATA);
			request(app).get(ADMIN_ENDPOINT).set('Authorization', `Bearer ${VALID_ADMIN_JWT}`).expect(200);
		});

		describe('ensureAuth.Authenticated', () => {
			it('should return UNAUTHORIZED when the user does not provide the authorization header', () =>
				request(app).get(AUTHORIZED_ENDPOINT).expect(401));

			it('should return UNAUTHORIZED if the provided JWT is missing Bearer', () => {
				request(app).get(AUTHORIZED_ENDPOINT).set('Authorization', `${VALID_JWT}`).expect(401);
			});

			it('should proceed to request when the user provides a valid JWT', () => {
				spyOnGetUserFromJwt.mockResolvedValueOnce(VALID_TOKEN_DATA);
				request(app).get(AUTHORIZED_ENDPOINT).set('Authorization', `Bearer ${VALID_JWT}`).expect(200);
			});
		});
	});
});
