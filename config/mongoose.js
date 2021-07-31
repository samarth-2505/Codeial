//require the library
const mongoose = require('mongoose');
const env = require('./environment');

//connect to the database
mongoose.connect(`mongodb://localhost/${env.db}`);

//acquire the connection(to check if it is succesfull)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'connection error:'));

//if it is up and runing then print the message
db.once('open', function() {
  // we're connected!
  console.log('Succesfully connected to the database');
});

module.exports=db;