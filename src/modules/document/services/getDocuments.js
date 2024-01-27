import { DocumentModel } from '../../../schemas/document.js';

export const getDocuments = async (query) => {
	const { search = '', sortBy = 'DESC' } = query;
	const limit = query.limit ? parseInt(query.limit) : 10;
	const page = query.page ? parseInt(query.page) : 1;
	const skip = (page - 1) * limit;
	const sort = sortBy === 'DESC' ? -1 : 1;
	const searchRegex = new RegExp(search, 'i');

	const documents = await DocumentModel.find({
		$or: [{ content: searchRegex }, { keywords: searchRegex }, { 'file.originalName': searchRegex }],
	})
		.where({ deletedAt: null })
		.sort({ createdAt: sort })
		.skip(skip)
		.limit(limit);

	const totalDocuments = await DocumentModel.countDocuments({
		$or: [{ content: searchRegex }, { keywords: searchRegex }, { 'file.originalName': searchRegex }],
	}).where({ deletedAt: null });

	return {
		data: documents,
		info: {
			totalItems: totalDocuments,
			totalPages: Math.ceil(totalDocuments / limit),
			currentPage: page,
			limit,
		},
	};
};
