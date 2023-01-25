var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url, { useUnifiedTopology: true });

// DB Name
const dbname = 'conFusion';


const dbCon = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected correctly to server');

  const db = client.db(dbname);
  const collection = db.collection('dishes');

  try {
    const insertItem = await collection.insertOne({
      "name": "coffe",
      "description": "another test"
    });
    console.log('Inserted document =>', insertItem);

    const findAll = await collection.find({}).toArray();
    console.log('Found documents =>', findAll);
  }
  catch (err) {
    console.log(err);
  }
  finally {
    await client.close();
  }

}
dbCon();

// MongoClient.connect(url, (err, client) => {

//   assert.equal(err, null);
//   console.log('Connected correctly to server');

//   const db = client.db(dbname);
//   const collection = db.collection('dishes');

//   collection.insertOne({
//     "name": "coffe",
//     "description": "another test"
//   }, (err, result) => {
//     assert.equal(err, null);

//     console.log('Afetr Insert:\n');
//     console.log(result.ops);

//     collection.find({}).toArray((err, docs) => {
//       assert.equal(err, null);

//       console.log('Found:\n');
//       console.log(docs);

//       db.dropCollection('dishes', (err, result) => {
//         assert.equal(err, null);

//         client.close();
//       })
//     })
//   })
// })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishes');
var promoRouter = require('./routes/promos');
var leaderRouter = require('./routes/leaders');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promos', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
