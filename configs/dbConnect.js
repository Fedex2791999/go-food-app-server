const mongoose = require('mongoose');
const mongoDb = require('./key').MongoUri;

module.exports = {
  databaseConnection: function () {
    mongoose
      .connect(mongoDb, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log('Connected to MongoDB...'))
      .catch((err) =>
        console.error('Could not connect to MongoDB...', err.message)
      );
  },
  // createLocalConnection: mongoose.createConnection(mongoDb, {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  // }),
};
