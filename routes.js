const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Rotas da home
route.get('/', homeController.index);

// login rote
route.get('/login/', loginController.index);
route.post('/register/', loginController.register);
route.post('/login/', loginController.login);
route.get('/logout/', loginController.logout);

module.exports = route;
