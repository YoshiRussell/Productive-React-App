const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
require('dotenv').config()

// Creating server
const app = express()
const port = process.env.PORT || 5000

// App Middleware
app.use(cors());            // allows http://localhost:3000 to safely talk to http://localhost:5000
app.use(express.json());    // parse ~ create json objects

// Connect to MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, 
                        useCreateIndex: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// parse JWT formatted access tokens
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-lkenkzaj.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:5000/',
  issuer: 'https://dev-lkenkzaj.us.auth0.com/',
  algorithms: ['RS256']
});

// add JWT parser to middleware
app.use(jwtCheck);

// routes
const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');

app.use('/api/users', usersRouter);
app.use('/api/todo', todosRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));