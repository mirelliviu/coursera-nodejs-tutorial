
const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url, { 
  useUnifiedTopology: true,
  retryWrites: true
});

// DB Name
const dbname = 'conFusion';
const  db = client.db(dbname);

// Connect to DB
const dbConn = async () => {
  // Use connect method to connect to the server
  try {
    await client.connect();
    console.log(`Connected succesfully to database`);
   
  }
  catch (err) {
    console.log(`Error connecting to Database: ${err}`);
  }
}

// const monitorConnection = () => {
//   if(db) {
//       db.on('serverOpening', () => {
//           console.log('Server reconnecting');
//       });
//   }
// }

module.exports = {
  dbConn,
  db
}