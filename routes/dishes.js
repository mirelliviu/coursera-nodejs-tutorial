const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const dishesController = require('../controllers/dishesController');

router.use(bodyParser);

router.route('/')
  // .all((req, res, next) => {
  //   res.status(200);
  //   res.setHeader('Content-Type', 'text/plain');
  //   next();
  // })
  .get(dishesController.getAllDishes)
  .post(dishesController.createNewDish)
  // .put((req, res) => {
  //   res.status(403).send('PUT operation not supported on /dishes');
  // })
  // .delete((req, res) => {
  //   res.send('Deleting all the dishes!');  
  // });

  router.route('/:id')
    .get(dishesController.getDish)
    .put(dishesController.updateDish)
    .delete(dishesController.deleteDish);

module.exports = router;