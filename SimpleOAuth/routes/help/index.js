const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Help for application. This is an unauthenticated route.' });
});

module.exports = routes;