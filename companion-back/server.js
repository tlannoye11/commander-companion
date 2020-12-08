import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import morgan from 'morgan';

import deckRoutes from './routes/deckRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import userRoutes from './routes/userRoutes.js';
//const db = require('./config/keys').deckURI;

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.get('/', (request, response) => {
	response.send('API is runnin and runnin');
});

app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

app.use('/api/decks', deckRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`);
});
