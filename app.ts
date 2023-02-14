import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import sqlite from 'sqlite3';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
	res.status(200).send(`<h2>Hello world</h2>`);
});

app.get('/connect', async (req: Request, res: Response) => {
	try {
		await new Promise((resolve, reject) => {
			const db = new sqlite.Database(':memory', err => {
				if (err) {
					reject(err);
				}

				resolve(db);
			});
		});

		res.status(200).json({ success: true, message: 'Connection established' });
	} catch (err) {
    //@ts-ignore
		res.status(500).json({ success: false, message: err?.message });
	}
});

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
