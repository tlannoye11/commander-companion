const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const deckRoutes = require('./routes/deck.route');
const cardRoutes = require('./routes/card.route');
const db = require('./config/keys').deckURI;

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/decks', deckRoutes);
app.use('/cards', cardRoutes);

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to MongoDB`))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
