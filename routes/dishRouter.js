const express = require('express');
const dishRouter = express.Router();
const bodyParser = require('body-parser');

dishRouter.route('/')
    .all((req, res, next) => {
        res.status(200);
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(req, res, next => {
        res.end('Will send all the dishes to you!');
    }) 
    .post(req, res, next => {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put(req, res, next => {
        res.status(403);
        res.end('PUT operation not suported on /dishes');
    })
    .delete(req, res, next => {
        res.end('Deleting all the dishes!');
    })

dishRouter.route('/:id')
    .all((req, res, next) => {
        res.status(200);
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(eq, res, next => {
        res.end(`Get dish with id: ${req.params.id}!`);
    })
    .put(eq, res, next => {
        res.end(`Updating dish with id: ${req.params.id}!`);
    })
    .delete(eq, res, next => {
        res.end(`Deleting dish with id: ${req.params.id}!`);
    });

module.exports = dishRouter;