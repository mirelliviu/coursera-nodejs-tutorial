const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const https = require('https');
const mongoose = require('mongoose');
const dbConn = require('./config/dbConn');
const fs = require('fs');
const auth = require('./controllers/authController');

const PORT = process.env.PORT || 443;

const options = {
  key: fs.readFileSync('/Users/mirelliviu/Desktop/Coursera\ Full\ Stack\ Web\ Development/nodejs/SSL/server.key', 'binary'),
  cert: fs.readFileSync('/Users/mirelliviu/Desktop/Coursera\ Full\ Stack\ Web\ Development/nodejs/SSL/server.cert', 'binary')
};

dbConn();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/dishes', require('./routes/dishes'));
app.use('/promos', require('./routes/promos'));
app.use('/leaders', require('./routes/leaders'));

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

mongoose.connection.once('open', () => {
  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS server listening on port ${PORT}`);
  });
})

