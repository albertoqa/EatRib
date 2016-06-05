var mongoose = require( 'mongoose' );
var shutdownDB;

/* Open database connection */
var dbURI = 'mongodb://localhost/EatRib';
if(process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

/* Listen for connection events */
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

/* Close database connection */
shutdownDB = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// Nodemon
process.once('SIGUSR2', function() {
  shutdownDB('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// System
process.on('SIGINT', function() {
  shutdownDB('app termination', function() {
    process.exit(0);
  });
});

// Heroku
process.on('SIGTERM', function() {
  shutdownDB('Heroku app shutdown', function() {
    process.exit(0);
  });
});

require('./locations');
