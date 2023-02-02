
const mongoose = require('mongoose');


// Connection URL
const url = 'mongodb://localhost:27017/conFusion';

// Connect to DB
const dbConn = async () => {
  // Use connect method to connect to the server
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Connected succesfully to database`);
    
   
  }
  catch (err) {
    console.log(`Error connecting to Database: ${err}`);
  }
}

//  Check if a new connection is open
mongoose.connection.on('open', () => {
  console.log("A new connection is opened -> Number of open connections: ", mongoose.connections.length);
});

// Check if reconnect to db
mongoose.connection.on('reconnect', () => { 
  console.log('-> reconnected to db'); 
});

// Check if an connection is closed
mongoose.connection.on('close', () => {
  console.log("A connection is closed -> Number of open connections: ", mongoose.connections.length);
});

// Check if connection to db server is lost
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB connection lost -> Attempting to reconnect...');
});

process.on('SIGINT', () => {
  console.log('Closing MongoDB connection...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed...');
    process.exit(0);
  });
});

// process.on('exit', () => {
//   console.log('Closing MongoDB connection.');
//   mongoose.connection.close(() => {
//     console.log('MongoDB connection closed.');
//   });
// });



module.exports = dbConn