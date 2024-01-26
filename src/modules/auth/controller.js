import { Router } from 'express';
import { LoginBodySchema, RegisterBodySchema } from './validators/user.js';
import { login, register } from './services/auth.js';

export const AuthController = Router();

AuthController.post('/login', async (req, res) => {
	const validateBody = LoginBodySchema.safeParse(req.body);

	if (!validateBody.success) {
		return res.status(400).json(validateBody.error);
	}

	const { user, accessToken } = await login(validateBody.data);

	return res.status(200).json({ user, accessToken });
});

AuthController.post('/register', async (req, res) => {
	const validateBody = RegisterBodySchema.safeParse(req.body);

	if (!validateBody.success) {
		return res.status(400).json(validateBody.error);
	}
	const { user } = await register(validateBody.data);

	return res.status(201).json({ user });
});
