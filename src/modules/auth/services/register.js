import { UserModel } from '../../../schemas/user.js';

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
