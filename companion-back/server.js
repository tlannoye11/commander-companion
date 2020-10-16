import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import deckRoutes from './routes/deck.route.js';
import cardRoutes from './routes/card.route.js';
//const db = require('./config/keys').deckURI;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/decks', deckRoutes);
app.use('/cards', cardRoutes);

mongoose
	.connect(process.env.DECK_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log(`Connected to MongoDB`))
	.catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.listen(PORT, () => {
	console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`);
});
