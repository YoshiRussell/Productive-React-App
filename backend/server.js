const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

// Creating server
const app = express()
const port = process.env.PORT || 5000

// App Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, 
                        useCreateIndex: true,
                        useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');

app.use('/users', usersRouter);
app.use('/todo', todosRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));