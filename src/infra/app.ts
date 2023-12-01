import express from 'express';
import { AddressInfo } from 'net';
import { envSchema } from './env/schema';
import { routes } from './routes';

export const app = express();

app.use(express.json());
app.use(routes);

const { PORT } = envSchema.parse(process.env);

const server = app.listen(PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running on http://localhost:${address.port}`);
  }
});
