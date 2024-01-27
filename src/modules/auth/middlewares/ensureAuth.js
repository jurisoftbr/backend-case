import { unauthorized } from '@hapi/boom';
import { getUserFromJwt } from '../utils/getUserFromJwt.js';

const authenticateUserRequest = async (req) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw unauthorized('Authorization header missing.');
	}

	const [type, token] = authHeader.split(' ') ?? [];
	const isBearerToken = type.toLowerCase() === 'bearer';

	if (!isBearerToken) {
		throw unauthorized('Invalid authorization header');
	}

	return await getUserFromJwt(token);
};

const Authenticated = async (req, res, next) => {
	try {
		const user = await authenticateUserRequest(req);
		req.user = user;
		next();
	} catch (err) {
		return res.status(401).json(unauthorized('Invalid user authentication'));
	}
};

export const ensureAuth = {
	Authenticated,
};
