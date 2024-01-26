const assertEnvVarPresent = (value, envName) => {
	if (value == null) {
		throw new Error(`Required environment variable missing on init: ${envName}`);
	}
	// toString is to guard against pure number environment variables
	return value.toString();
};

export const PORT = process.env.PORT ?? 3000;
export const HOST = assertEnvVarPresent(process.env.HOST, 'HOST').endsWith('/')
	? process.env.HOST.slice(0, -1)
	: process.env.HOST;
export const MONGO_URL = assertEnvVarPresent(process.env.MONGO_URL, 'MONGO_URL');
export const JWT_SECRET = assertEnvVarPresent(process.env.JWT_SECRET, 'JWT_SECRET');
