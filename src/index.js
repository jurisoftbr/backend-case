import app from './app.js';
import { PORT, HOST } from './config.js';
import { connectMongodb } from './services/db.js';

async function start() {
	try {
		await connectMongodb();

		app.listen(PORT, () => {
			console.info(`REST API is available at ${HOST}`);
		});
	} catch (error) {
		console.error('Error starting the application:', error);
		process.exit(1);
	}
}

void start();
