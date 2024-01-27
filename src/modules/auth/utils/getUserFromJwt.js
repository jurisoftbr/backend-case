import { UserModel } from '../../../schemas/user.js';
import { UserSchema } from '../validators/user.js';

export const getUserFromJwt = async (token) => {
	const user = jwt.verify(token, JWT_SECRET);

	const parsedUser = UserSchema.parse(user);

	const findedUser = await UserModel.findById(parsedUser.id);

	if (!findedUser) throw unauthorized('Invalid token');

	return { ...parsedUser, token: token };
};
