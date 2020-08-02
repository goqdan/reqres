const Joi = require('joi');

const schema = Joi.object({
    id: Joi.number(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    avatar: Joi.string().regex(/((\.jpg)|(\.png))$/)
})

module.exports = schema;