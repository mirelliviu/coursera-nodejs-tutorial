
const mongoose = require('mongoose');


// Connection URL
const url = 'mongodb://localhost:27017/conFusion';

// Connect to DB
const dbConn = async () => {
  // Use connect method to connect to the server
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log(`Connected succesfully to database`);
   
  }
  catch (err) {
    console.log(`Error connecting to Database: ${err}`);
  }
}

module.exports = dbConn