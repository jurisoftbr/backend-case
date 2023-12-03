import { z } from 'zod';

export const userRequestSchema = z.object({
  id: z.string(),
  role: z.string(),
});
