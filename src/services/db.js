import { connect } from 'mongoose';
import { MONGO_URL } from '../config.js';

export const connectMongodb = async () => {
	try {
		await connect(MONGO_URL);
		console.log('MongoDB connection established');
	} catch (e) {
		console.error('Error connecting to MongoDB:', e);
		throw new Error('Unable to connect to MongoDB');
	}
};
