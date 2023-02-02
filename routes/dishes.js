const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const dishesController = require('../controllers/dishesController');

router.use(bodyParser);

router.route('/')
  .get(dishesController.getAllDishes)
  .post(dishesController.createNewDish)

router.route('/:dishId')
  .get(dishesController.getDish)
  .put(dishesController.updateDish)
  .delete(dishesController.deleteDish);

router.route('/:dishId/comments')
  .get(dishesController.getDishComments)
  .post(dishesController.addDishComment)
  .delete(dishesController.deleteDishComments);

router.route('/:dishId/comments/:commentId')
  .put(dishesController.updateDishComment)
  .delete(dishesController.deleteDishComment);

module.exports = router;