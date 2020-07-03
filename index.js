const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const databaseConnection = require('./configs/dbConnect').databaseConnection;

//* Routes import
const businessApi = require('./routes/services/business');
const eventApi = require('./routes/services/event');
const geoApi = require('./routes/services/geo');
const userApi = require('./routes/auth/user');

const app = express();
const PORT = process.env.PORT || 3000;

//* Default config
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* Routes use
app.use('/api/business', businessApi);
app.use('/api/event', eventApi);
app.use('/api/geo', geoApi);
app.use('/api/auth', userApi);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to go food server ...');
});

databaseConnection();

app.listen(PORT, () => {
  console.log(`App run on port ${PORT}`);
});
