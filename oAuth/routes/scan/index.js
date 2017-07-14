const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'SCAN should be an authenticated route and cannot be accessed without authentication' });
});
module.exports = routes;