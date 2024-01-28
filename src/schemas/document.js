import mongoose from 'mongoose';
import { redisClient } from '../services/redis.js';

const VersionSchema = new mongoose.Schema({
	content: { type: String, required: true },
	modifiedBy: { type: String, required: true },
	modifiedAt: { type: Date, default: Date.now },
});

const DocumentSchema = new mongoose.Schema(
	{
		id: { type: String, required: true },
		content: { type: String, required: true },
		deletedAt: { type: Date, default: null },
		keywords: { type: [String] },
		file: {
			data: { type: Buffer, required: true },
			contentType: { type: String, required: true },
			originalName: { type: String, required: true },
		},
		versions: [VersionSchema],
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
		collection: 'Document',
	},
);

DocumentSchema.pre('find', async function cacheFindDocuments() {
	const connectedClient = await redisClient.on('error', console.error).connect();

	const key = `findDocuments_${JSON.stringify(this.getQuery())}`;

	const cachedData = await connectedClient.get(key);

	if (cachedData) {
		return JSON.parse(cachedData);
	}

	await connectedClient.disconnect();
});

DocumentSchema.pre('save', async function revalidateCache() {
	const connectedClient = await redisClient.on('error', console.error).connect();

	const keysToDelete = await connectedClient.keys('findDocuments*');

	if (keysToDelete.length) {
		await Promise.all(keysToDelete.map((key) => redisClient.del(key)));
	}

	await connectedClient.disconnect();
});

export const DocumentModel = mongoose.models.Document || mongoose.model('Document', DocumentSchema);
