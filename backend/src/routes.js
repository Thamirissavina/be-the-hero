const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs',  OngController.index);

routes.post('/ongs',  celebrate(),{
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().require(),
        email: Joi.string().require().email(),
        whatsapp: Joi.string().require().min(10).max(11),
        city: Joi.string.require(),
        uf: Joi.string().require().length(2),
    })

}, OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().require(),
    }).unknown(),
}) , ProfileController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().require(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        titlle: Joi.string().require(),
        description: Joi.string().require(),
        value: Joi.number().require(),
    })
}), IncidentController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.delete('./incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().require(),
    })
}), IncidentController.delete);

module.exports = routes;