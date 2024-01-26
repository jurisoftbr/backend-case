import { internal, isBoom } from '@hapi/boom';

export const errorHandler = (error, _req, res, _next) => {
	if (isBoom(error)) {
		console.warn(error);
		return res.status(error.output.payload.statusCode).json(error.output.payload);
	}

	console.error(error);

	return res.status(500).json(internal(String(error), String(error)));
};
