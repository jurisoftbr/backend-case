import { z } from 'zod';

export const requestUserSchema = z.object({
  id: z.string(),
  role: z.string(),
});
