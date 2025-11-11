import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';
import { fileURLToPath } from 'url';
import goals from './routes/goalRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use('/api/goals', goals);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
	// Serve static files
	app.use(express.static(path.join(__dirname, '../frontend/dist')));

	// Catch all routes not starting with /api
	app.get(/^\/(?!api).*/, (req, res) => {
		res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
	});
} else {
	app.get('/', (req, res) => res.send('API is running...'));
}

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () =>
	console.log(colors.cyan.bold(`Server started on port ${port}`))
);
