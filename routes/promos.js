const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();

router.use(bodyParser);

router
  .route('/')
  .all((req, res, next) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    console.log(res);
    res.send('Will send all the promos to you!');
  })
  .post((req, res) => {
    res.send('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description)
  })
  .put((req, res) => {
    res.status(403).send('PUT operation not supported on /promos');
  })
  .delete((req, res) => {
    res.send('Deleting all the promos!');
  });

  router
  .route('/:id')
  .all((req, res, next) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.send('Getting promo with id: ' + req.params.id);
  })
  .put((req, res) => {
    res.send('Updating promo with id: ' + req.params.id);
  })
  .delete((req, res) => {
    res.send('Deleting promo with id: ' + req.params.id);
  });

module.exports = router;