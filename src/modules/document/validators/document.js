import { z } from 'zod';

export const GetDocumentsQuerySchema = z.object({
	page: z.string().min(1).optional(),
	limit: z.string().min(1).optional(),
	search: z.string().optional(),
	sortBy: z.enum(['DESC', 'ASC']).optional(),
});

export const DocumentIdParamSchema = z.object({
	documentId: z.string(),
});
