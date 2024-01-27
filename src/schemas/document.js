import mongoose from 'mongoose';

const VersionSchema = new mongoose.Schema({
	content: { type: String, required: true },
	modifiedBy: { type: String, required: true },
	modifiedAt: { type: Date, default: Date.now },
});

const DocumentSchema = new mongoose.Schema(
	{
		content: { type: String, required: true },
		deletedAt: { type: Boolean, default: false },
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

export const DocumentModel = mongoose.models.Document || mongoose.model('Document', DocumentSchema);
