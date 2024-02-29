const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index);

// login rote
route.get('/login/', loginController.index);
route.post('/register/', loginController.register);
route.post('/login/', loginController.login);
route.get('/logout/', loginController.logout);

// Contact Rote
route.get('/contact/', loginRequired, contatoController.index);
route.post('/contact/register', loginRequired, contatoController.register);
route.get('/contact/:id', loginRequired, contatoController.editIndex);
route.post('/contact/edit/:id', loginRequired, contatoController.edit);
route.get('/contact/delete/:id', loginRequired, contatoController.delete);

module.exports = route;
