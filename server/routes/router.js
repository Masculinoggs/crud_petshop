const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Rota Raiz
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description adicionar animais de estimação
 *  @method GET /add-pet
 */
route.get('/add-pet', services.add_pet)

/**
 *  @description para atualizar animal de estimação
 *  @method GET /update-pet
 */
route.get('/update-pet', services.update_pet)

//API
route.post('/api/pets', controller.create);
route.get('/api/pets', controller.find);
route.put('/api/pets/:id', controller.update);
route.delete('/api/pets/:id', controller.delete);

module.exports = route