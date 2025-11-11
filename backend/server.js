import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import ProductRouter from './routes/product.routes.js';
import path from 'path';
dotenv.config();
const app = express();
app.use(express.json());
const __dirname = path.resolve();

app.use('/api/products', ProductRouter);
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/dist')));

	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
	});
}
app.listen(PORT, () => {
	connectDB();
	console.log(`connected to the port ${PORT}`);
});

