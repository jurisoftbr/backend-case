import { Router } from 'express';
import { LoginBodySchema, RegisterBodySchema } from './validators/user.js';
import { login } from './services/login.js';
import { register } from './services/register.js';
import { badRequest } from '@hapi/boom';

export const AuthController = Router();

AuthController.post('/login', async (req, res) => {
	const validateBody = LoginBodySchema.safeParse(req.body);

	if (!validateBody.success) {
		throw badRequest('Invalid email or password.');
	}

	const { user, accessToken } = await login(validateBody.data);

	return res.status(200).json({ user, accessToken });
});

AuthController.post('/register', async (req, res) => {
	const validateBody = RegisterBodySchema.safeParse(req.body);

	if (!validateBody.success) {
		throw badRequest('Invalid email or password.', validateBody.error);
	}
	const { user } = await register(validateBody.data);

	return res.status(201).json({ user });
});
