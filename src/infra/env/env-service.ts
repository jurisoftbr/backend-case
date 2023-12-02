import { envSchema } from './schema';
import { z } from 'zod';

type EnvSchema = z.infer<typeof envSchema>;

export class EnvService {
  get(key: keyof EnvSchema) {
    return envSchema.parse(process.env)[key];
  }
}
