import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config.js';
import { unauthorized } from '@hapi/boom';
import { UserModel } from '../../../schemas/user.js';

export const login = async ({ email, password }) => {
	const user = await UserModel.findOne({ email });

	if (!user) {
		throw unauthorized('Invalid email/password');
	}

	const isPasswordValid = user.comparePassword(password);

	if (!isPasswordValid) {
		throw unauthorized('Invalid email/password');
	}

	const payload = {
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role,
	};

	const token = jwt.sign(payload, JWT_SECRET);

	return {
		user: payload,
		accessToken: token,
	};
};

export const register = async ({ name, email, password }) => {
	// there are many ways to determine if a user is an admin
	// this is just for demonstration purposes
	const isAdmin = email.split('@')[1] === 'admin.com';
	const role = isAdmin ? 'admin' : 'user';

	const user = await UserModel.create({ name, email, password, role });

	return {
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
		},
	};
};
