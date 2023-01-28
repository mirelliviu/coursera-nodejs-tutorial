const Dish = require('../models/Dish');
const ObjectId = require('mongodb').ObjectId;


const getAllDishes = async (req, res) => {
    
    const dishes = await Dish.find();
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
        const result = await Dish.create({
            name: req.body.name,
            description: req.body.description
        });
        res.status(201).json(result);
    }
    catch (err) {
        console.log(err);
    }
}
const updateDish = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({
            'message': 'Id parameter is required.'
        })
    }

    try {
        const id = new ObjectId(req.params.id);
        const result = await Dish.updateOne(
            { _id: id },
            { $set: {
                    name: req.body.name,
                    description: req.body.description
            }}
        );

        if (!result.matchedCount) {
            return res.status(204).json({ 'message': `No dish found whit ID ${req.params.id}` })
        }
        res.status(200).json(result.modifiedCount);
    }
    catch (err) {
        console.log(err);
    }
}
const deleteDish = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({
            'message': 'Id parameter is required.'
        })
    }

    try {
        const id = new ObjectId(req.params.id);
        const result = await Dish.deleteOne({ _id: id });

        if (!result.deletedCount) {
            return res.status(204).json({ 'message': `No dish found whit ID ${req.params.id}` })
        }
        res.status(200).json(result.deletedCount);
    }
    catch (err) {
        console.log(err);
    }

}
const getDish = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({
            'message': 'Id parameter is required.'
        })
    }

    try {
        const id = new ObjectId(req.params.id);
        const result = await Dish.findById(id).exec();

        if (!result) {
            return res.status(204).json({ 'message': `No dish found whit ID ${req.params.id}` })
        }
        res.status(200).json(result);
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
    getDish
}