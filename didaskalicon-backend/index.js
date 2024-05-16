require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database connected')
})

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})