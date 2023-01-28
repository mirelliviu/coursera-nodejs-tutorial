const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema(
    {
    name: {
        type: String,
        requred: true,
        unique: true
    },
    description : {
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Dish', dishSchema)