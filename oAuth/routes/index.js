const routes = require('express').Router();
const scanRoutes = require('./scan');
const helpRoutes = require('./help');

routes.use('/scan', scanRoutes);
routes.use('/help', helpRoutes);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'All is well and working now' });
});

module.exports = routes;