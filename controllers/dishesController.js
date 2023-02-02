const Dish = require('../models/Dish');
const ObjectId = require('mongodb').ObjectId;


const getAllDishes = async (req, res) => {
    
    const dishes = await Dish.find().exec();
    if(!dishes) return res.status(204).json({ 'message': 'No dishes found' });
    res.status(200).json(dishes);

}

const createNewDish = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({
            'message': 'Dish are required.'
        });
    }
    try {
        const result = await Dish.create(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        console.log(err);
    }
}

const updateDish = async (req, res) => {

    const { dishId } = req.params;

    if (!dishId) {
        return res.status(400).json({
            'message': 'Id parameter is required.'
        })
    }

    try {
        const objDishId = new ObjectId(dishId);
        const { name, description } = req.body;

        // Update dish name and description
        if (!req.body) {
            return res.status(204).json({ 'message': `Name or description is empty fo dish with Id ${req.params.id}` })
        }

        const result = await Dish.updateOne(
            { _id: objDishId }, 
            { $set: { name, description } }
        ).exec();
        // Result = {
        //     acknowledged: true,
        //     modifiedCount: 0,
        //     upsertedId: null,
        //     upsertedCount: 0,
        //     matchedCount: 0
        //   }
        
        // const dish = await Dish.findOne(objDishId).exec();
        // // if no dish find return null
        // dish.name = name;
        // dish.description = description;

        // const result = await dish.save();
        // // result = updated dish

        if (!result.matchedCount) {
            return res.status(204).json({ 'message': `No dish found whit ID ${dishId}` })
        }

        if (!result.modifiedCount) {
            return res.status(204).json({ 'message': `No update was made for dish whit ID ${dishId}` })
        }

        res.status(200).json(result.modifiedCount);

    }
    catch (err) {
        console.log(err);
    }

}

const deleteDish = async (req, res) => {
    if (!req?.params?.dishId) {
        return res.status(400).json({
            'message': 'Id parameter is required.'
        })
    }

    try {
        const dishId = new ObjectId(req.params.dishId);
        const dish = await Dish.deleteOne(dishId);

        if (!dish.deletedCount) {
            return res.status(204).json({ 'message': `No dish found whit ID ${req.params.id}` })
        }
        res.status(200).json(dish.deletedCount);
    }
    catch (err) {
        console.log(err);
    }

}
const getDish = async (req, res) => {
    if (!req?.params?.dishId) {
        return res.status(400).json({
            'message': 'Id parameter is required.'
        })
    }

    try {
        const dishId = new ObjectId(req.params.dishId);
        const dish = await Dish.findById(dishId).exec();
        console.log(dish);

        if (!dish) {
            return res.status(204).json({ 'message': `No dishh found whit ID ${req.params.id}` })
        }
        res.status(200).json(dish);
    }
    catch (err) {
        console.log(err);
    }
}

const getDishComments = async (req, res) => {
    if (!req?.params?.dishId) {
        return res.status(400).json({
            'message': 'Dish Id parameter is required.'
        })
    }

    try {
        const dishId = new ObjectId(req.params.dishId);
        const dish = await Dish.findById(dishId).exec();

        if (!dish) {
            return res.status(204).json({ 'message': `No dish found whit ID ${req.params.id}` })
        }
        res.status(200).json(dish.comments);
    }
    catch (err) {
        console.log(err);
    }
}

const addDishComment = async (req, res) => {
    if (!req?.params?.dishId) {
        return res.status(400).json({
            'message': 'Dish Id parameter is required.'
        })
    }
console.log(req.body);
    try {
        const dishId = new ObjectId(req.params.dishId);
        const dish = await Dish.findById(dishId).exec();

        dish.comments.push(req.body.comment);

        const result = await dish.save();

        if (!result) {
                return res.status(204).json({ 'message': `No new comment was add for dish whit ID ${req.params.id}` })
        }
        console.log(result);
        res.status(200).json(result);   
    }
    catch (err) {
        console.log(err);
    }
}

const deleteDishComments = async (req, res) => {
    if (!req?.params?.dishId) {
        return res.status(400).json({
            'message': 'Dish Id parameter is required.'
        })
    }

    try {
        const dishId = new ObjectId(req.params.dishId);
        const result = await Dish.findByIdAndUpdate(
            dishId,
            { comments: [] },
            { new: true }
            );

        if (!result) {
                return res.status(204).json({ 'message': `Comments was not deleted for dish whit ID ${req.params.id}` })
        }
        console.log(result.comments);
        res.status(200).json(result.comments);
    }
    catch (err) {
        console.log(err);
    }
}

const updateDishComment = async (req, res) => {
    const { dishId, commentId } = req.params;
    if (!dishId & !commentId) {
        return res.status(400).json({
            'message': 'Dish Id and comment Id parameter is required.'
        })
    }

    try {
        const dishId = new ObjectId(req.params.dishId);
        const commentId = new ObjectId(req.params.commentId);
        const result = await Dish.findOneAndUpdate(
            { "_id": dishId, "comments._id": commentId },
            { $set: {
                "comments.$.rating": req.body.comment.rating,
                "comments.$.comment": req.body.comment.comment,
                "comments.$.author": req.body.comment.author
            }},
            { new: true }
            );

        if (!result) {
                return res.status(204).json({ 'message': `Comments was not deleted for dish whit ID ${req.params.id}` })
        }
        console.log(result);
        res.status(200).json(result.comments);
    }
    catch (err) {
        console.log(err);
    }
}

const deleteDishComment = async (req, res) => {
    const { dishId, commentId } = req.params;
    if (!dishId & !commentId) {
        return res.status(400).json({
            'message': 'Dish Id and comment Id parameter is required.'
        })
    }

    try {
        const dishId = new ObjectId(req.params.dishId);
        const commentId = new ObjectId(req.params.commentId);

        const dish = await Dish.findById(dishId);
        dish.comments.id(commentId).remove();
        const result = await dish.save();

        if (!result) {
            return res.status(204).json({ 'message': `Comment whit id:${commentId} was not deleted for dish whit ID ${dishId}` })
    }
        console.log(result);
        res.status(200).json(result.comments);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllDishes,
    createNewDish,
    updateDish,
    deleteDish,
    getDish,
    getDishComments,
    addDishComment,
    deleteDishComments,
    updateDishComment,
    deleteDishComment
}