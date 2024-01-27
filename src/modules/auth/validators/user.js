import { z } from 'zod';

export const LoginBodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const RegisterBodySchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(8),
});

export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
})
